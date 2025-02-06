from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from .database import get_db

main = Blueprint('main', __name__)

@main.route('/api/user', methods=['GET'])
@jwt_required()
def get_user():
    db = get_db()
    identity = get_jwt_identity()
    
    user = db.users.find_one({"_id": identity["user_id"]}, {"_id": 0, "password": 0})
    if not user:
        return jsonify({"message": "User not found"}), 404

    return jsonify(user)

@main.route('/api/environment-components', methods=['GET'])
def get_environment_components():
    db = get_db()
    components = db.components.find({}, {"_id": 0})
    return jsonify(list(components))

@main.route('/api/add-component', methods=['POST'])
@jwt_required()
def add_component():
    data = request.get_json()
    db = get_db()

    if not all(key in data for key in ["name", "description", "importance"]):
        return jsonify({"error": "Missing required fields"}), 400

    new_component = {
        "name": data['name'],
        "description": data['description'],
        "importance": data['importance'],
    }

    db.components.insert_one(new_component)
    return jsonify({"message": "Component added successfully!"}), 201
