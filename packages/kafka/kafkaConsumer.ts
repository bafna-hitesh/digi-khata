function createKafkaConsumer(kafka: any, groupId: string) {
  return kafka.consumer({ groupId });
}

async function checkConsumerConnectionToKafka(kafkaConsumer: any) {
  await kafkaConsumer.connect();
}

async function consumeDataFromKafka(kafkaConsumer: any, topic: string) {
  await kafkaConsumer.subscribe({
    topic: topic,
    fromBeginning: true,
  });
  await kafkaConsumer.run({
    eachMessage: async ({ topic, partition, message }: { topic: string, partition: string, message: any}) => {
      console.log(JSON.parse(message.value.toString()));
    },
  });
}

export {
  createKafkaConsumer,
  checkConsumerConnectionToKafka,
  consumeDataFromKafka
}