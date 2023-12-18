**to update requirements.txt**

`pip freeze > requirements.txt`

**Communication Flow:**

- User sets filters in the frontend.
- Frontend sends filter data as a JSON payload to the Trade MS.
- The Trade microservice responsible for filters receives the data and publishes it to a Kafka topic.
- The Flink Streaming microservice subscribes to the Kafka topic and receives the filter data in real-time.
- Flink Streaming reads the filtered trades data.
- Flink performs the heavy calculations on the filtered data using libraries like NumPy and Pandas.
- The calculation results are sent back to the frontend through an API endpoint or another message queue like RabbitMQ.
- The frontend updates the UI with the results in real-time.
