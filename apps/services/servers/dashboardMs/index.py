from flask import Flask
from loaders.index import initialize_app, run_app  # Assuming loaders is a module

def main():
    app = Flask(__name__)
    initialize_app(app)
    run_app(app)  # Now 'run_app' should accept an 'app' instance

if __name__ == "__main__":
    main()
