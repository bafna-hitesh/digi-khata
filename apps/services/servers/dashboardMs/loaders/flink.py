import logging
import os
from typing import List
from pyflink.datastream import StreamExecutionEnvironment, RuntimeExecutionMode
from pyflink.common.serialization import SimpleStringSchema
from pyflink.common.restart_strategy import RestartStrategies
from pyflink.common.time import Time
from pyflink.datastream.connectors import FlinkKafkaConsumer
from conf.index import KAFKA_HOST, FLINK_TOPICS
from pyflink.table import StreamTableEnvironment, EnvironmentSettings
from datetime import timedelta

from api.flink.trades import Router

logging.basicConfig(level=logging.INFO)

def create_kafka_consumer(topic: str) -> FlinkKafkaConsumer:
  try:
    properties = {
        'bootstrap.servers': KAFKA_HOST,  # Kafka broker address
        'group.id': 'flink-group',              # Kafka consumer group
        # Add more Kafka consumer properties as needed
    }

    return FlinkKafkaConsumer(
      topic,
      SimpleStringSchema(),
      properties
    )
  except Exception as e:
    logging.error(f"Error creating Kafka consumer for topic {topic}: {e}")
    raise

def initialize_app(topics: List[str]) -> None:
  try:
    env = StreamExecutionEnvironment.get_execution_environment()

    env.set_runtime_mode(RuntimeExecutionMode.STREAMING)
    env.set_parallelism(100)
    
    # Set Kafka connector JAR
    kafka_connector_jar = f'file://{os.getcwd()}/jars/flink-sql-connector-kafka-3.0.2-1.18.jar'
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
      kafka_source = create_kafka_consumer(topic)
      ds = env.add_source(kafka_source)
      router.route(topic, kafka_source)

    # Start the Flink application
    env.execute("Dashboard Application")

  except Exception as e:
    logging.error(f"Error occurred while initializing the Flink application: {e}")
    raise
    # Handle or rethrow exception as necessary

def initialize_flink() -> None:
  topics = FLINK_TOPICS
  initialize_app(topics)
