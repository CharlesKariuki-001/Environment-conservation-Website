from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from .database import get_db

main = Blueprint('main', __name__)

@main.route('/api/user', methods=['GET'])
@jwt_required()
def get_user():
    """
    Retrieve user details using JWT identity.
    """
    db = get_db()
    if not db:
        return jsonify({"error": "Database connection error"}), 500

    identity = get_jwt_identity()
    user = db.users.find_one({"_id": identity["user_id"]}, {"_id": 0, "password": 0})

    if not user:
        return jsonify({"message": "User not found"}), 404

    return jsonify(user), 200

@main.route('/api/environment-components', methods=['GET'])
def get_environment_components():
    """
    Fetch all environment components.
    """
    db = get_db()
    if db is None:
        return jsonify({"error": "Database connection error"}), 500

    components = list(db.components.find({}, {"_id": 0}))
    return jsonify(components), 200

@main.route('/api/add-component', methods=['POST'])
@jwt_required()
def add_component():
    """
    Add a new environmental component.
    """
    try:
        data = request.get_json()
        db = get_db()

        if not db:
            return jsonify({"error": "Database connection error"}), 500

        required_fields = ["name", "description", "importance"]
        if not all(key in data and data[key] for key in required_fields):
            return jsonify({"error": "Missing or empty required fields"}), 400

        # Check if component already exists
        existing_component = db.components.find_one({"name": data["name"]})
        if existing_component:
            return jsonify({"error": "Component already exists"}), 409

        new_component = {
            "name": data['name'],
            "description": data['description'],
            "importance": data['importance'],
        }

        db.components.insert_one(new_component)
        return jsonify({"message": "Component added successfully!"}), 201

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500
