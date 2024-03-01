import json
from flask import Flask, request
from confluent_kafka import Producer

app = Flask(__name__)

producer = Producer({'bootstrap.servers': 'kafka:9092'})
app = Flask(__name__)

@app.route("/", methods=["POST"])
def process_message():
    data = request.get_json()
    # Process data and prepare message
    message = json.dumps(data).encode("utf-8")
    producer.send("your_topic", message)
    return {"message": "Data received successfully."}

if __name__ == "__main__":
    app.run(debug=True, port=6000)