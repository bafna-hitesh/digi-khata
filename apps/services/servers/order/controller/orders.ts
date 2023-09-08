import { NextFunction, Request, Response } from "express";
import busboy from "busboy";
import csv from "csv-parser";
import { createKafkaInstance, kafkaProducer } from "@digi/kafka";
import config from "../config";

export const ordersUpload = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Connecting to Kafka
    let kafka = createKafkaInstance(config.KAFKA_HOST.split(','));
    let producer = kafkaProducer.createKafkaProducer(kafka);
    await kafkaProducer.checkProducerConnectionToKafka(producer);

    // Parse the file uploaded and upload the data to Kafka
    const bb = busboy({ headers: req.headers });

    bb.on('file', (name: string, file: any, info: any) => {

        file
        .pipe(csv())
        .on('data', (row: any) => {
          row.broker = 'Kite';
          // Todo - Get the user from req object. This user will be set when we verify the request that contains token in the middleware
          row.user = 'Some Kite User';
          kafkaProducer.produceDataToKafka(producer, 'orders', '0', row);
        })
        .on('end', () => {
          console.log('CSV processing finished');
        })
        .on('error', (error: any) => {
          throw error;
        })
    });

    bb.on('close', () => {
      res.send('Parsed CSV Successfully');
    });
  
    req.pipe(bb);

  } catch (error: any){
    next({
      status: 500,
      message: error.message
    })
  }
}