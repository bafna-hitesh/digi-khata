#!/bin/bash

# Set the path for the virtual environment
VENV_PATH="./servers/dashboardMs/venv"

# Check if the virtual environment folder exists
if [ ! -d "$VENV_PATH" ]; then
    echo "Creating virtual environment at $VENV_PATH"
    python -m venv "$VENV_PATH"
fi

# Activate the virtual environment
source "$VENV_PATH/bin/activate"

# Install requirements if requirements.txt has changed since last install
# pip install -r ./requirements.txt

# Start the Flask application with nodemon
nodemon --watch '.' --ext py --exec python ./servers/dashboardMs/index.py
