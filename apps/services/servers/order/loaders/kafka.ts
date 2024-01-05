import { createKafkaInstance, kafkaConsumer, kafkaProducer } from '@digi/kafka';
import config from '../config';
import { processOrders } from '../utils/orders';
import { processTrades } from '../utils/trades';
import getTradesBasedOnBroker from '../utils/dashboard';

const kafka = createKafkaInstance(config.KAFKA_HOST.split(','), 'order-ms');

const orderMsProducer = kafkaProducer.createProducer(kafka);

const ordersConsumer = kafkaConsumer.createConsumer(kafka, 'orders');

const tradesConsumer = kafkaConsumer.createConsumer(kafka, 'trades');

const dashboardConsumer = kafkaConsumer.createConsumer(kafka, 'dashboard');

const produceDataToKafka = async (topic: string, payload: Record<string, unknown>, key?: string) => {
  try {
    await kafkaProducer.produceData(orderMsProducer, topic, payload, key);
  } catch (err) {
    console.log('[Order-MS] Error producing data to topic: ', topic);
  }
};

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
        processTrades(accessToken as string);
      },
    });
  } catch (err) {
    console.log('Some Error Occurred while consuming from trades', err);
  }
};

const processDashboardEvent = async (
  userId: string,
  brokers: string[],
  startDate: Date,
  endDate: Date,
  segment: string,
  clubbing: string,
) => {
  // Get all the trades based on the filters for different brokers
  // This will generate a [[{}, {}, ....], [{}, {}, ...], ...] data structure.
  const trades = brokers.map((broker) => {
    return getTradesBasedOnBroker(broker, userId, startDate, endDate, segment);
  });

  // Flatting the array to combine all the trades of different brokers
  const consolidatedTrades = trades.flat();

  const data = {
    userId,
    brokers,
    startDate,
    endDate,
    segment,
    clubbing,
    trades: consolidatedTrades,
  };

  // Now produce this data to Kafka to be then consumed by Flink for processing
  produceDataToKafka('process-dashboard-data', data, userId);
};

// Start consuming events for getting data in dashboard
const consumeDashboardEvents = async () => {
  try {
    // Check consumer connection to Kafka
    kafkaConsumer.checkConsumerConnectionToKafka(dashboardConsumer);

    // Subscribing to topic
    kafkaConsumer.subscribeToTopic(dashboardConsumer, 'dashboard', false);

    // Consume Dashboard Events
    await dashboardConsumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const dashboardEvent = JSON.parse(message?.value?.toString() as string);
        const userId = dashboardEvent?.userId;
        const brokers = dashboardEvent?.brokers;
        const startDate = dashboardEvent?.startDate;
        const endDate = dashboardEvent?.endDate;
        const clubbing = dashboardEvent?.clubbing;
        const segment = dashboardEvent?.segment;

        // Logging onto console
        const messageLog = `[${message.timestamp}] [Dashboard] {${topic} | ${partition} | ${message.offset}} Processing Dashboard data for user ${userId} for brokers: ${brokers} in date range ${startDate} - ${endDate} with clubbing ${clubbing} and segment as ${segment}`;
        console.log(messageLog);

        processDashboardEvent(userId, brokers, startDate, endDate, segment, clubbing);
      },
    });
  } catch (err) {
    console.log('Some error occurred while consuming dashboard events', err);
  }
};

export { kafka, syncAllBrokersOrdersInBackground, syncAllBrokersTradesInBackground, consumeDashboardEvents };
