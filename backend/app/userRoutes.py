from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token
from werkzeug.security import generate_password_hash, check_password_hash
from .database import get_db
from .models import User  

user_routes = Blueprint('user_routes', __name__)

@user_routes.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()
    if not data or not all(k in data for k in ['username', 'password', 'email', 'address']):
        return jsonify({"message": "All fields (username, password, email, address) are required!"}), 400

    db = get_db()
    existing_user = db.users.find_one({'username': data['username']})
    if existing_user:
        return jsonify({"message": "User already exists!"}), 400

    hashed_password = generate_password_hash(data['password'])
    new_user = {
        "username": data['username'],
        "password": hashed_password,
        "email": data['email'],
        "address": data['address'],
        "is_admin": False
    }

    db.users.insert_one(new_user)

    return jsonify({"message": f"Account created successfully for {data['username']}!"}), 201

@user_routes.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or not all(k in data for k in ['username', 'password']):
        return jsonify({"message": "Username and password are required!"}), 400

    db = get_db()
    user = db.users.find_one({'username': data['username']})

    if not user or not check_password_hash(user['password'], data['password']):
        return jsonify({"message": "Invalid username or password!"}), 401

    token = create_access_token(identity={"user_id": str(user['_id']), "is_admin": user.get('is_admin', False)})

    return jsonify({"message": f"Welcome back, {data['username']}!", "token": token, "is_admin": user.get('is_admin', False)}), 200
