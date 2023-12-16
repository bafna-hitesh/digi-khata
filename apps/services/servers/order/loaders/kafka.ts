import { createKafkaInstance, kafkaConsumer } from '@digi/kafka';
import config from '../config';
import processOrders from '../utils/orders';

const kafka = createKafkaInstance(config.KAFKA_HOST.split(','), 'order-ms');

const ordersConsumer = kafkaConsumer.createConsumer(kafka, 'orders');

const tradesConsumer = kafkaConsumer.createConsumer(kafka, 'trades');

const syncAllBrokersOrdersInBackground = async () => {
  try {
    // Checking Consumer connection to Kafka
    kafkaConsumer.checkConsumerConnectionToKafka(ordersConsumer);

    // Subscribing to topic
    kafkaConsumer.subscribeToTopic(ordersConsumer, 'orders', false);

    // Consume accessToken from orders topic
    await ordersConsumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const accessToken = message?.value?.toString();
        // Logging onto console
        const messageLog = `[${message.timestamp}] [Orders] {${topic} | ${partition} | ${message.offset}} accessToken - ${accessToken}`;
        console.log(messageLog);
        processOrders(accessToken as string);
      },
    });
  } catch (err) {
    console.log('Some Error Occurred while consuming from orders', err);
  }
};

const syncAllBrokersTradesInBackground = async () => {
  try {
    // Checking Consumer connection to Kafka
    kafkaConsumer.checkConsumerConnectionToKafka(tradesConsumer);

    // Subscribing to topic
    kafkaConsumer.subscribeToTopic(tradesConsumer, 'trades', false);

    // Consume accessToken from trades topic
    await tradesConsumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const accessToken = message?.value?.toString();
        // Logging onto console
        const messageLog = `[${message.timestamp}] [Trades] {${topic} | ${partition} | ${message.offset}} accessToken - ${accessToken}`;
        console.log(messageLog);
        processOrders(accessToken as string);
      },
    });
  } catch (err) {
    console.log('Some Error Occurred while consuming from trades', err);
  }
};

export { syncAllBrokersOrdersInBackground, syncAllBrokersTradesInBackground };
