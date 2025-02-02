from flask import Flask
from flask_cors import CORS  # Import CORS
from .routes import main
from .userRoutes import user_routes  # Import the new userRoutes blueprint
from .database import init_db
from dotenv import load_dotenv  # Import dotenv to load environment variables
import os

def create_app():
    app = Flask(__name__)
    CORS(app)  # Enable CORS for the entire app
    
    # Load environment variables from .env file
    load_dotenv()

    # Secret key for JWT (make sure to set a proper secret key)
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'your_default_secret_key')  # Load secret key from env variable (optional)

    # Initialize MongoDB connection
    init_db(app)

    # Register Blueprints for routes
    app.register_blueprint(main)         # Register main routes (environment components)
    app.register_blueprint(user_routes)  # Register user routes (login/signup)

    return app
