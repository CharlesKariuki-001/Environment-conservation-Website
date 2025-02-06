from flask import Flask
from flask_cors import CORS  
from flask_jwt_extended import JWTManager  
from .routes import main
from .userRoutes import user_routes  
from .database import init_db
from dotenv import load_dotenv  
import os

def create_app():
    app = Flask(__name__)
    CORS(app)  

    load_dotenv()

    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'your_default_secret_key')  
    app.config['JWT_SECRET_KEY'] = app.config['SECRET_KEY']  # Ensure JWT uses the same secret key

    JWTManager(app)  # Initialize JWT

    init_db(app)

    app.register_blueprint(main)         
    app.register_blueprint(user_routes)  

    return app
