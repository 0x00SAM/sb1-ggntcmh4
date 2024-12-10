"""
User management routes module.
Handles user-related endpoints.
"""
from flask import Blueprint, jsonify
from app.utils.auth import token_required, admin_required
from app.services.user_service import UserService

users_bp = Blueprint('users', __name__)
user_service = UserService()

@users_bp.route('/', methods=['GET'])
@admin_required
def get_users():
    """Get all users (admin only)"""
    try:
        users = user_service.get_all_users()
        return jsonify(users), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@users_bp.route('/<user_id>', methods=['GET'])
@token_required
def get_user(user_id):
    """Get user by ID"""
    try:
        # Check if user is requesting their own profile or is admin
        if user_id != str(request.user.id) and request.user.user_metadata.get('role') != 'admin':
            return jsonify({'error': 'Unauthorized'}), 403
            
        user = user_service.get_user(user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404
            
        return jsonify(user), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@users_bp.route('/<user_id>', methods=['PUT'])
@token_required
def update_user(user_id):
    """Update user profile"""
    try:
        # Check if user is updating their own profile or is admin
        if user_id != str(request.user.id) and request.user.user_metadata.get('role') != 'admin':
            return jsonify({'error': 'Unauthorized'}), 403
            
        data = request.json
        user = user_service.update_user(user_id, data)
        return jsonify(user), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500