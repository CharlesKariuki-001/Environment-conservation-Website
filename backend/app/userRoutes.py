from flask import Blueprint, jsonify, request, current_app
import jwt
import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from .database import get_db
from .models import User  # Assuming this model class is already defined

# Create a Blueprint for user routes
user_routes = Blueprint('user_routes', __name__)

# User Signup
@user_routes.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()
    if not data or not data.get('username') or not data.get('password') or not data.get('email') or not data.get('address'):
        return jsonify({"message": "All fields (username, password, email, address) are required!"}), 400

    # Check if the user already exists
    db = get_db()
    existing_user = db.users.find_one({'username': data['username']})
    if existing_user:
        return jsonify({"message": "User already exists!"}), 400

    # Create a new user using the User model
    new_user = User(data['username'], data['password'], email=data['email'], address=data['address'])
    new_user.hash_password()  # Hash the user's password before saving

    # Insert the new user into the MongoDB database
    db.users.insert_one(new_user.to_dict())

    return jsonify({"message": f"Account created successfully for {data['username']}!"}), 201

# User Login
@user_routes.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or not data.get('username') or not data.get('password'):
        return jsonify({"message": "Username and password are required!"}), 400

    # Find the user by username using the User model
    db = get_db()
    user_data = db.users.find_one({'username': data['username']})
    if not user_data:
        return jsonify({"message": "Invalid username or password!"}), 401

    user = User(user_data['username'], user_data['password'], is_admin=user_data.get('is_admin', False), email=user_data['email'], address=user_data['address'])

    if not user.check_password(data['password']):
        return jsonify({"message": "Invalid username or password!"}), 401

    # Create the JWT token
    token = jwt.encode(
        {'user_id': str(user_data['_id']), 'is_admin': user.is_admin, 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)},
        current_app.config['SECRET_KEY'], algorithm='HS256'
    )

    return jsonify({"message": f"Welcome back, {data['username']}!", "token": token, "is_admin": user.is_admin}), 200
