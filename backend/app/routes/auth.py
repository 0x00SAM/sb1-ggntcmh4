"""
Authentication routes module.
Handles user authentication endpoints.
"""
from flask import Blueprint, request, jsonify
from app.utils.supabase_client import get_supabase_client
from app.services.user_service import UserService

auth_bp = Blueprint('auth', __name__)
user_service = UserService()

@auth_bp.route('/login', methods=['POST'])
def login():
    """Handle user login"""
    try:
        data = request.json
        if not data or not data.get('email') or not data.get('password'):
            return jsonify({'error': 'Email and password are required'}), 400
            
        supabase = get_supabase_client()
        response = supabase.auth.sign_in_with_password({
            'email': data['email'],
            'password': data['password']
        })
        
        return jsonify({
            'token': response.session.access_token,
            'user': response.user
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 401

@auth_bp.route('/register', methods=['POST'])
def register():
    """Handle user registration"""
    try:
        data = request.json
        required_fields = ['email', 'password', 'firstName', 'lastName']
        
        if not data or not all(field in data for field in required_fields):
            return jsonify({'error': 'All fields are required'}), 400
            
        supabase = get_supabase_client()
        auth_response = supabase.auth.sign_up({
            'email': data['email'],
            'password': data['password'],
            'options': {
                'data': {
                    'first_name': data['firstName'],
                    'last_name': data['lastName'],
                    'role': 'employee'  # Default role
                }
            }
        })
        
        # Create user profile
        if auth_response.user:
            profile_data = {
                'first_name': data['firstName'],
                'last_name': data['lastName'],
                'email': data['email'],
                'role': 'employee'
            }
            user_service.create_user_profile(auth_response.user.id, profile_data)
        
        return jsonify({
            'message': 'Registration successful',
            'user': auth_response.user
        }), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400