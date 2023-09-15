function createKafkaProducer(kafka: any) {
  return kafka.producer();
}

async function checkProducerConnectionToKafka(kafkaProducer: any) {
  await kafkaProducer.connect();
}

function produceDataToKafka(kafkaProducer: any, topic: string, partition: string, payload: any) {
  return kafkaProducer.send({
    topic: topic,
    messages: [
      {
        partition: partition,
        value: JSON.stringify(payload),
      },
    ],
  });
}

export { createKafkaProducer, checkProducerConnectionToKafka, produceDataToKafka };
