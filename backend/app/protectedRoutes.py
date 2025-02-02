from flask import Blueprint, jsonify
from .middleware.authMiddleware import token_required  # type: ignore # Corrected import

protected = Blueprint('protected', __name__)

@protected.route('/api/protected-data', methods=['GET'])
@token_required
def protected_data(current_user):
    return jsonify({'message': f'Hello, {current_user}, you are authorized!'}), 200
