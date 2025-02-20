from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS  # Import CORS
from .database import get_db
from bson import ObjectId
import traceback  # Import for debugging

user_routes = Blueprint('user_routes', __name__)
CORS(user_routes)  # Enable CORS for this blueprint

@user_routes.route('/api/signup', methods=['POST'])
def signup():
    """Handles user registration."""
    try:
        data = request.get_json()
        required_fields = ['username', 'password', 'email', 'address']

        # Validate required fields
        if not data or not all(k in data and data[k] for k in required_fields):
            return jsonify({"message": "All fields (username, password, email, address) are required!"}), 400

        db = get_db()
        if db is None:
            return jsonify({"message": "Database connection error!"}), 500

        # Check if username or email already exists
        if db.users.find_one({'username': data['username']}):
            return jsonify({"message": "Username is already taken!"}), 400
        if db.users.find_one({'email': data['email']}):
            return jsonify({"message": "Email is already in use!"}), 400

        # Hash password
        hashed_password = generate_password_hash(data['password'])

        # Insert user into database
        new_user = {
            "username": data['username'],
            "password": hashed_password,
            "email": data['email'],
            "address": data['address'],
            "is_admin": False
        }

        result = db.users.insert_one(new_user)
        if result.inserted_id:
            return jsonify({"message": f"Account created successfully for {data['username']}!"}), 201
        else:
            return jsonify({"message": "Failed to create account. Please try again."}), 500

    except Exception as e:
        print("Signup Error:", e)
        traceback.print_exc()
        return jsonify({"message": "Internal Server Error", "error": str(e)}), 500


@user_routes.route('/api/login', methods=['POST'])
def login():
    """Handles user login and returns JWT token."""
    try:
        data = request.get_json()

        # Validate inputs
        if not data or not all(k in data and data[k] for k in ['username', 'password']):
            return jsonify({"message": "Username and password are required!"}), 400

        db = get_db()
        if db is None:
            return jsonify({"message": "Database connection error!"}), 500

        user = db.users.find_one({'username': data['username']})
        
        # Verify user credentials
        if not user or not check_password_hash(user['password'], data['password']):
            return jsonify({"message": "Invalid username or password!"}), 401

        # Create JWT token
        token = create_access_token(identity={"user_id": str(user['_id']), "is_admin": user.get('is_admin', False)})

        return jsonify({
            "message": f"Welcome back, {user['username']}!",
            "token": token,
            "user": {
                "id": str(user['_id']),
                "username": user['username'],
                "email": user['email'],
                "address": user['address'],
                "is_admin": user.get('is_admin', False)
            }
        }), 200

    except Exception as e:
        print("Login Error:", e)
        traceback.print_exc()
        return jsonify({"message": "Internal Server Error", "error": str(e)}), 500
