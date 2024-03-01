from .flask import create_app
from .errors import load_errors
from .flink import initialize_flink

def initialize_app():
    app = create_app()
    load_errors(app)
    initialize_flink()
    return app
