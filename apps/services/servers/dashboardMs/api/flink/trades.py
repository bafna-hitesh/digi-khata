from pyflink.datastream import StreamExecutionEnvironment
from pyflink.table import StreamTableEnvironment
from pyflink.datastream.connectors import FlinkKafkaConsumer
from controller.trades import EventController

class Router:
  def __init__(self, env: StreamExecutionEnvironment, table_env: StreamTableEnvironment):
    self.env = env
    self.table_env = table_env

  def route(self, topic: str, kafka_source: FlinkKafkaConsumer):
    if topic == "dashboard":
      controller = EventController(self.env, kafka_source, self.table_env)
      controller.process()
    # Add more routing logic here
    else:
      print(f"No controller defined for topic: {topic}")
