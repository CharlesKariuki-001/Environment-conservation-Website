import os
from dotenv import load_dotenv

load_dotenv()  # Load environment variables

MONGO_URI = os.getenv("MONGO_URI")  # Get MongoDB URI from .env

if not MONGO_URI:
    print("❌ ERROR: MONGO_URI is not found in .env file!")
else:
    print("✅ MONGO_URI Loaded Successfully!")
