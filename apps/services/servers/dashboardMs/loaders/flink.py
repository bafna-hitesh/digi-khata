import logging
import os
import sys
from datetime import timedelta
from typing import List

from api.flink.trades import Router
from conf.index import FLINK_TOPICS, KAFKA_HOST
from pyflink.common import Configuration, Types, WatermarkStrategy
from pyflink.common.restart_strategy import RestartStrategies
from pyflink.datastream import RuntimeExecutionMode, StreamExecutionEnvironment
from pyflink.datastream.connectors.kafka import (FlinkKafkaConsumer,
                                                 FlinkKafkaProducer)
from pyflink.datastream.formats.json import (JsonRowDeserializationSchema,
                                             JsonRowSerializationSchema)
from pyflink.table import EnvironmentSettings, StreamTableEnvironment

logging.basicConfig(stream=sys.stdout, level=logging.INFO, format="%(message)s")

def create_kafka_consumer(topic: str, group_id: str) -> FlinkKafkaConsumer:
  deserialization_schema = JsonRowDeserializationSchema.Builder() \
      .type_info(Types.ROW([Types.INT(), Types.STRING()])) \
      .build()
  kafka_consumer = FlinkKafkaConsumer(
      topics=topic,
      deserialization_schema=deserialization_schema,
      properties={'bootstrap.servers': KAFKA_HOST, 'group.id': group_id}
  )
  kafka_consumer.set_start_from_earliest()
  return kafka_consumer

def create_kafka_producer(topic: str) -> FlinkKafkaProducer:
  type_info = Types.ROW([Types.INT(), Types.STRING()])
  serialization_schema = JsonRowSerializationSchema.Builder() \
      .with_type_info(type_info) \
      .build()
  kafka_producer = FlinkKafkaProducer(
      topic=topic,
      serialization_schema=serialization_schema,
      producer_config={'bootstrap.servers': KAFKA_HOST, 'group.id': 'flink-group'}
  )
  return kafka_producer

def initialize_app(topics: List[str]) -> None:
  try:
    config = Configuration()
    config.set_integer("python.fn-execution.bundle.size", 1000)
    config.set_integer("python.fn-execution.arrow.batch.size", 1000)
    config.set_integer("python.fn-execution.bundle.time", 1000)
    config.set_boolean("python.fn-execution.memory.managed", True)
    env = StreamExecutionEnvironment.get_execution_environment(config)

    env.set_runtime_mode(RuntimeExecutionMode.STREAMING)
    env.set_parallelism(2)
    
    # Set Kafka connector JAR
    # move this to env
    kafka_connector_jar = f'file://{os.getcwd()}/servers/dashboardMs/jars/flink-sql-connector-kafka-3.0.2-1.18.jar'
    env.add_jars(kafka_connector_jar)

    # TODO: Enable checkpointing for fault tolerance
    # checkpoint_path = "file:///../checkpoints"  # Relative path to the checkpoint directory
    # env.enable_checkpointing(10000)  # every 10000 ms
    # # Use CheckpointStorage for setting the checkpoint path
    # checkpoint_storage = CheckpointStorage(checkpoint_path)
    # env.get_checkpoint_config().set_checkpoint_storage(checkpoint_storage)

    # Set restart strategy for handling failures
    env.set_restart_strategy(RestartStrategies.fixed_delay_restart(
      3,  # Number of retry attempts
      timedelta(seconds=10)  # Delay between attempts
    ))
    
    # Set up the StreamTableEnvironment
    settings = EnvironmentSettings.new_instance().in_streaming_mode().build()
    table_env = StreamTableEnvironment.create(env, settings)

    router = Router(env, table_env)

    for topic in topics:
      kafka_consumer = create_kafka_consumer(topic, 'flink-group')
      kafka_producer = create_kafka_producer(topic)
      router.route(topic, kafka_consumer, kafka_producer)

    # Start the Flink application
    env.execute("Dashboard Application")

  except Exception as e:
    logging.error(f"Error occurred while initializing the Flink application: {e}")
    raise
    # Handle or rethrow exception as necessary

def initialize_flink() -> None:
  topics = FLINK_TOPICS
  initialize_app(topics)
