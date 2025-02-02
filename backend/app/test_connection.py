from pymongo import MongoClient
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get MongoDB URI from environment variable
mongo_uri = os.getenv('MONGO')

try:
    # Connect to MongoDB Atlas
    client = MongoClient(mongo_uri)
    db = client.get_database('Nature_Net')  # Ensure your database exists
    print("Successfully connected to MongoDB Atlas!")

    # List collections to verify connection
    print("Collections in the database:", db.list_collection_names())

except Exception as e:
    print("Error connecting to MongoDB:", e)
