# loaders/index.py

from .flask import create_app
from .errors import load_errors

def initialize_app():
    app = create_app()
    load_errors(app)
    return app
