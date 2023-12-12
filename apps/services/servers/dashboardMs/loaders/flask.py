# loaders/flask.py

from flask import Flask, jsonify
from flask_cors import CORS
from config.index import PORT

def create_app():
    app = Flask(__name__)

    @app.route("/status", methods=["GET"])
    def status():
        return jsonify({"message": "It Works Fine!"}), 200

    CORS(app)

    return app
