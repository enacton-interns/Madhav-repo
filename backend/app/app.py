from flask import Flask
import os
import psycopg2

app = Flask(__name__)

@app.route("/")
def home():
    return {
        "message": "Backend is running!",
        "database_host": os.getenv("DB_HOST"),
        "environment": os.getenv("APP_ENV")
    }

@app.route("/health")
def health():
    return "OK", 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)