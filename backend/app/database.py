from flask import current_app
from pymongo import MongoClient
import os
from dotenv import load_dotenv
from app.test_connection import MONGO_URI

# Load environment variables
load_dotenv()

def init_db(app):
    """
    Initialize MongoDB connection and ensure collections exist.
    """
    try:
        # Get MongoDB URI from environment variable
        mongo_uri = os.getenv('MONGO_URI')
        if not mongo_uri:
            raise ValueError("MongoDB URI not found. Ensure 'MONGO' is set in your .env file.")

        # Connect to MongoDB
        client = MongoClient(MONGO_URI)
        db = client['Nature_Net']  # Use your database name

        # Check if the database is accessible
        client.server_info()  # Will raise an error if MongoDB is unreachable

        # Ensure collections and indexes are created
        initialize_collections(db)

        # Store the database in app config
        app.config['DB'] = db
        print("✅ Database connected successfully!")
        return db
    except Exception as e:
        print(f"❌ Error connecting to MongoDB: {e}")
        raise

def initialize_collections(db):
    """
    Create collections and indexes if they don't exist.
    """
    collections = {
        "users": {"indexes": [{"key": [("username", 1)], "unique": True}]},
        "components": {"indexes": [{"key": [("name", 1)], "unique": False}]},
        "posts": {"indexes": []},
        "comments": {"indexes": [{"key": [("post_id", 1)]}]},
        "activities": {"indexes": [{"key": [("user_id", 1)]}]},
        "feedback": {"indexes": [{"key": [("user_id", 1)]}]},
    }

    for collection_name, config in collections.items():
        if collection_name not in db.list_collection_names():
            db.create_collection(collection_name)
            print(f"🟢 Collection '{collection_name}' created.")

        for index in config["indexes"]:
            db[collection_name].create_index(index["key"], unique=index.get("unique", False))
            print(f"🔵 Index created for '{collection_name}' on {index['key']}")

def get_db():
    """
    Get the database connection from the app config.
    """
    return current_app.config.get('DB', None)
