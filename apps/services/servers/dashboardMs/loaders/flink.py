import logging
import os
import sys
from typing import List
from pyflink.common import Types
from pyflink.datastream import StreamExecutionEnvironment, RuntimeExecutionMode
from pyflink.datastream.formats.json import JsonRowSerializationSchema, JsonRowDeserializationSchema
from pyflink.datastream.connectors.kafka import FlinkKafkaProducer, FlinkKafkaConsumer
from conf.index import KAFKA_HOST, FLINK_TOPICS
from pyflink.table import StreamTableEnvironment, EnvironmentSettings
from pyflink.common import WatermarkStrategy
from api.flink.trades import Router
from datetime import timedelta
from pyflink.common.restart_strategy import RestartStrategies

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
    env = StreamExecutionEnvironment.get_execution_environment()

    env.set_runtime_mode(RuntimeExecutionMode.STREAMING)
    env.set_parallelism(100)
    
    # Set Kafka connector JAR
    kafka_connector_jar = f'file://{os.getcwd()}/servers/dashboardMs/jars/flink-sql-connector-kafka-3.0.2-1.18.jar'
    env.add_jars(kafka_connector_jar)

    # TODO: Enable checkpointing for fault tolerance
    # checkpoint_path = "file:///../checkpoints"  # Relative path to the checkpoint directory
    # env.enable_checkpointing(10000)  # every 10000 ms
    # # Use CheckpointStorage for setting the checkpoint path
    # checkpoint_storage = CheckpointStorage(checkpoint_path)
    # env.get_checkpoint_config().set_checkpoint_storage(checkpoint_storage)

    # TODO: Network buffer configuration
    # env.get_configuration().set_string("taskmanager.network.memory.fraction", "0.3")

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
      env.add_source(kafka_consumer).add_sink(kafka_producer)
      router.route(topic, kafka_consumer)

    # Start the Flink application
    env.execute("Dashboard Application")

  except Exception as e:
    logging.error(f"Error occurred while initializing the Flink application: {e}")
    raise
    # Handle or rethrow exception as necessary

def initialize_flink() -> None:
  topics = FLINK_TOPICS
  initialize_app(topics)
