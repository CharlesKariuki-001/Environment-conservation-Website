from flask import Blueprint, jsonify, request, current_app
from .database import get_db

main = Blueprint('main', __name__)

# Route to get environmental components
@main.route('/api/environment-components', methods=['GET'])
def get_environment_components():
    db = get_db()
    components = db.components.find()  # MongoDB collection
    return jsonify([component for component in components])

# Route to add a new environmental component
@main.route('/api/add-component', methods=['POST'])
def add_component():
    data = request.get_json()
    db = get_db()
    
    # Example component object to insert into MongoDB
    new_component = {
        "name": data['name'],
        "description": data['description'],
        "importance": data['importance'],
    }
    
    # Insert component into MongoDB
    db.components.insert_one(new_component)
    
    return jsonify({"message": "Component added successfully!"}), 201
