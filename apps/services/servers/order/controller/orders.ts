import { NextFunction, Request, Response } from 'express';
import { createKafkaInstance, kafkaConsumer, kafkaProducer } from '@digi/kafka';
import config from '../config';
import User from '../../user/models/User';
import { zerodha } from '@digi/brokers';
import Trade from '../models/Trades';

export const tradesUploadToKafka = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Connecting to Kafka
    let kafka = createKafkaInstance(config.KAFKA_HOST.split(','));
    let producer = kafkaProducer.createKafkaProducer(kafka);
    await kafkaProducer.checkProducerConnectionToKafka(producer);

    // 1. Get trades for the day
    // 2. Upload these trades to Kafka Topic
    // 3. Consume these messages from Kakfa Topic and insert it into Postgres
    
    // let accessToken = await User.findAll({
    //   where: {
    //     kiteUserID: 'JX7559',
    //     // Change to req.user after authentication is done
    //   },
    // });

    // let trades = (await zerodha.kitetrades.getAlltradesForTheDay({ apiKey: config.KITE_API_KEY, accessToken })).data;

    // For testing, getting the trades locally
    for(let i = 0; i < trades.length; i++) {
      let trade = {
        // Todo - Get the user from req object. This user will be set when we verify the request that contains token in the middleware
        user: 'Some User',
        broker: 'Kite',
        symbol: trades[i].tradingsymbol,
        tradeDate: trades[i].fill_timestamp.split(' ')[0],
        exchange: trades[i].exchange,
        segment: zerodha.kiteTrades.getTradeTypeFromTradingSymbol(trades[i].tradingsymbol),
        transactionType: trades[i].transaction_type,
        quantity: trades[i].quantity,
        price: trades[i].average_price,
        tradeID: trades[i].trade_id,
        orderID: trades[i].order_id
      }
      kafkaProducer.produceDataToKafka(producer, 'trades', '0', trade);
    }

    return res.status(200).json({
      message: 'Data uploaded to Kafka successfully'
    });

  } catch (error: any) {
    next({
      status: 500,
      message: error.message,
    });
  }
};

export const tradesSyncToPostgres = async (req: Request, res: Response, next: NextFunction) => {
  try {

    let topic = 'trades';
    // Connecting to Kafka
    let kafka = createKafkaInstance(config.KAFKA_HOST.split(','));
    let consumer = kafkaConsumer.createKafkaConsumer(kafka, topic);
    await kafkaConsumer.checkConsumerConnectionToKafka(consumer);

    await consumer.subscribe({
      topic: topic,
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async ({ message }: { message: any }) => {
        let trade = JSON.parse(message.value.toString());
        // console.log(trade);

        // Inserting to Postgres
        await Trade.create({
          user: trade.user,
          broker: trade.broker,
          symbol: trade.symbol,
          tradeDate: trade.tradeDate,
          exchange: trade.exchange,
          segment: trade.segment,
          transactionType: trade.transactionType,
          quantity: trade.quantity,
          price: trade.price,
          tradeID: trade.tradeID,
          orderID: trade.orderID
        });
      },
    });

    return res.status(200).json({
      message: 'Data synced to Postgres successfully'
    });

  } catch(error: any) {
    next({
      status: 500,
      message: error.message
    });
  }
}

// For Testing Only
let trades = [
  {
    "trade_id": "10000000",
    "order_id": "200000000000000",
    "exchange": "NSE",
    "tradingsymbol": "SBIN",
    "instrument_token": 779521,
    "product": "CNC",
    "average_price": 420.65,
    "quantity": 1,
    "exchange_order_id": "300000000000000",
    "transaction_type": "BUY",
    "fill_timestamp": "2021-05-31 09:16:39",
    "order_timestamp": "09:16:39",
    "exchange_timestamp": "2021-05-31 09:16:39"
  },
  {
    "trade_id": "40000000",
    "order_id": "500000000000000",
    "exchange": "CDS",
    "tradingsymbol": "USDINR21JUNFUT",
    "instrument_token": 412675,
    "product": "MIS",
    "average_price": 72.755,
    "quantity": 1,
    "exchange_order_id": "600000000000000",
    "transaction_type": "BUY",
    "fill_timestamp": "2021-05-31 11:18:27",
    "order_timestamp": "11:18:27",
    "exchange_timestamp": "2021-05-31 11:18:27"
  },
  {
    "trade_id": "70000000",
    "order_id": "800000000000000",
    "exchange": "MCX",
    "tradingsymbol": "GOLDPETAL21JUNFUT",
    "instrument_token": 58424839,
    "product": "NRML",
    "average_price": 4852,
    "quantity": 1,
    "exchange_order_id": "312115100078593",
    "transaction_type": "BUY",
    "fill_timestamp": "2021-05-31 16:00:36",
    "order_timestamp": "16:00:36",
    "exchange_timestamp": "2021-05-31 16:00:36"
  },
  {
    "trade_id": "90000000",
    "order_id": "1100000000000000",
    "exchange": "MCX",
    "tradingsymbol": "GOLDPETAL21JUNFUT",
    "instrument_token": 58424839,
    "product": "NRML",
    "average_price": 4852,
    "quantity": 1,
    "exchange_order_id": "1200000000000000",
    "transaction_type": "BUY",
    "fill_timestamp": "2021-05-31 16:08:41",
    "order_timestamp": "16:08:41",
    "exchange_timestamp": "2021-05-31 16:08:41"
  }
];