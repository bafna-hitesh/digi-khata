#!/bin/bash

# Get the directory of the current script
SCRIPT_DIR=$(dirname "$0")

echo "Script Directory: $SCRIPT_DIR"

# Set the path for the virtual environment
VENV_PATH="$SCRIPT_DIR/venv"

# Check if the virtual environment folder exists
if [ ! -d "$VENV_PATH" ]; then
    echo "Creating virtual environment at $VENV_PATH"
    python -m venv "$VENV_PATH"
fi

# Activate the virtual environment
source "$VENV_PATH/bin/activate"

# Install requirements if requirements.txt has changed since last install
pip install -r "$SCRIPT_DIR/requirements.txt"

# Start the Flask application with nodemon
# nodemon --watch '.' --ext py --exec python3 "$SCRIPT_DIR/servers/dashboardMs/index.py"
