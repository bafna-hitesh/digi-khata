import os
from dotenv import load_dotenv

try:
    load_dotenv()
except FileNotFoundError:
    print("Error: .env file not found!")
    exit(1)

PORT = int(os.environ.get("DASHBOARD_PYTHON_PORT", 6000))
