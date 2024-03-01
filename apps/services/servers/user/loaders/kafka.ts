import { createKafkaInstance, kafkaProducer } from '@digi/kafka';
import config from '../config';

const kafka = createKafkaInstance(config.KAFKA_HOST.split(','), 'user-ms');

const userLoginProducer = kafkaProducer.createProducer(kafka);

const produceDataToKafka = async (topic: string, payload: Record<string, unknown>, key?: string) => {
  try {
    await kafkaProducer.produceData(userLoginProducer, topic, payload, key);
  } catch (err) {
    console.log('[User-MS] Error producing data to topic: ', topic);
  }
};

export default produceDataToKafka;
