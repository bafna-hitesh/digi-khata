from flask import Flask, jsonify
from flask_cors import CORS
from config.index import PORT
# from api.routes import routes  # Assuming routes are under 'api' module

def create_app():
    app = Flask(__name__)
    app.config['PORT'] = PORT

    @app.route("/status", methods=["GET"])
    def status():
        return jsonify({"message": "It Works Fine!"}), 200

    app.config.from_object(config)
    # app.register_blueprint(routes)

    CORS(app)

    @app.teardown_appcontext
    def teardown_context(error):
        if error:
            print(f"Error in User Service: {error}")
            process.exit(1)

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=config.PORT)
    print(f"\n\x1b[36mUser Service started on port {config.PORT}!\x1b[0m\n")