import { Kafka } from 'kafkajs';
import { processOrders } from './orders';
import { processTrades } from './trades';

const createKafkaInstance = (brokersURL: string[]) => {
  return new Kafka({
    brokers: brokersURL,
  });
};

const createKafkaConsumer = (kafka: Kafka, groupId: string) => {
  return kafka.consumer({ groupId });
};

const syncOrdersInBackground = async (kafkaInstance: Kafka) => {
  // Create Kafka Consumer with Kafka Instance and groupId
  const kafkaConsumer = createKafkaConsumer(kafkaInstance, 'orders');

  // Connecting Kafka Consumer to Kafka
  await kafkaConsumer.connect();

  // Subscribing to topic
  await kafkaConsumer.subscribe({
    topic: 'ordersSync',
    fromBeginning: false, // Don't want to process all orders again if something goes wrong while processing
  });

  // Consume accessToken from orders topic
  await kafkaConsumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const accessToken = message?.value?.toString();
      // Logging onto console
      const messageLog = `[${message.timestamp}] [OrdersSync] {${topic} | ${partition} | ${message.offset}} accessToken - ${accessToken}`;
      console.log(messageLog);
      processOrders(accessToken as string);
    },
  });
};

const syncTradesInBackground = async (kafkaInstance: Kafka) => {
  // Create Kafka Consumer with Kafka Instance and groupId
  const kafkaConsumer = createKafkaConsumer(kafkaInstance, 'trades');

  // Connecting Kafka Consumer to Kafka
  await kafkaConsumer.connect();

  // Subscribing to topic
  await kafkaConsumer.subscribe({
    topic: 'tradesSync',
    fromBeginning: false, // Don't want to process all trades again if something goes wrong while processing
  });

  // Consume accessToken from orders topic
  await kafkaConsumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const accessToken = message?.value?.toString();
      // Logging onto console
      const messageLog = `[${message.timestamp}] [TradesSync] {${topic} | ${partition} | ${message.offset}} - accessToken : ${accessToken}`;
      console.log(messageLog);
      processTrades(accessToken as string);
    },
  });
};

export { createKafkaInstance, syncOrdersInBackground, syncTradesInBackground };
