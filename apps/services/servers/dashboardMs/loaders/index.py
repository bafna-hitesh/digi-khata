# Fix the relative imports based on your project structure
from .flask import create_app
from .errors import load_errors
from config.index import PORT

def initialize_app(app):
    load_errors(app)

def run_app(app):  # Accepting 'app' as an argument
    app.run(host="0.0.0.0", port=PORT)
