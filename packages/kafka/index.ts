import { Kafka } from 'kafkajs';
import * as kafkaProducer from './kafkaProducer';
import * as kafkaConsumer from './kafkaConsumer';

function createKafkaInstance(brokersURL: any) {
  return new Kafka({
    brokers: brokersURL,
  });
}

export { createKafkaInstance, kafkaProducer, kafkaConsumer };
