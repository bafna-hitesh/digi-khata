import json
import logging
from datetime import datetime
from typing import Any, Tuple, Union
from pyflink.common.typeinfo import Types
from pyflink.datastream import StreamExecutionEnvironment, DataStream
from pyflink.datastream.connectors import FlinkKafkaConsumer, FlinkKafkaProducer
from pyflink.datastream.functions import MapFunction, KeySelector
from pyflink.table import StreamTableEnvironment
from pyflink.datastream.window import TumblingEventTimeWindows
from pyflink.common.time import Time

class Deserialize(MapFunction):
  def map(self, value: str) -> Union[dict, None]:
    try:
      return json.loads(value)
    except Exception as e:
      logging.error(f"Error deserializing Kafka message: {value}. Error: {e}")
      return None

class ExtractDayOfWeek(KeySelector):
  def get_key(self, value: dict) -> Union[str, None]:
    try:
      date = datetime.strptime(value['date'], '%Y-%m-%d')
      return date.strftime('%A')  # Return day of the week
    except Exception as e:
      logging.error(f"Error extracting day of week: {value}. Error: {e}")
      return None

class SumProfit(MapFunction):
  def map(self, value: Tuple[str, list]) -> Tuple[str, float]:
    return (value[0], sum(profit for _, profit in value[1]))

class EventController:
  def __init__(self, env: StreamExecutionEnvironment, kafka_consumer: FlinkKafkaConsumer, kafka_producer: FlinkKafkaProducer, table_env: StreamTableEnvironment):
    self.env = env
    self.kafka_consumer = kafka_consumer
    self.table_env = table_env
    self.kafka_producer = kafka_producer

  def process(self) -> None:
    trades: DataStream = self.env.add_source(self.kafka_consumer)

    trades = trades.map(Deserialize(), output_type=Types.STRING())
    trades.add_sink(self.kafka_producer)

    trades_by_day: DataStream = trades.key_by(ExtractDayOfWeek(), key_type=Types.STRING())

    profitable_day: DataStream = trades_by_day \
      .window(TumblingEventTimeWindows.of(Time.days(1))) \
      .apply(SumProfit(), output_type=Types.TUPLE([Types.STRING(), Types.FLOAT()]))
