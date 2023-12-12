# /servers/dashboardMs/index.py

from loaders.index import initialize_app
from config.index import PORT

app = initialize_app()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=PORT)
