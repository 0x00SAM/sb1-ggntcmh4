"""
Authentication routes module.
Handles user authentication endpoints.
"""
from flask import Blueprint, request
from app.utils.response import success_response, error_response
from app.utils.db import get_supabase_client
from app.services.user_service import UserService
import logging

logger = logging.getLogger(__name__)
auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')
user_service = UserService()

@auth_bp.route('/login', methods=['POST'])
def login():
    """Handle user login"""
    try:
        data = request.json
        supabase = get_supabase_client()
        
        # Authenticate with Supabase
        auth_response = supabase.auth.sign_in_with_password({
            'email': data.get('email'),
            'password': data.get('password')
        })
        
        # Get user profile
        user = user_service.get_user(auth_response.user.id)
        
        return success_response({
            'token': auth_response.session.access_token,
            'user': user.to_dict() if user else None
        })
    except Exception as e:
        logger.error(f"Login failed: {str(e)}")
        return error_response("Invalid credentials", 401)

@auth_bp.route('/register', methods=['POST'])
def register():
    """Handle user registration"""
    try:
        data = request.json
        supabase = get_supabase_client()
        
        # Register with Supabase
        auth_response = supabase.auth.sign_up({
            'email': data.get('email'),
            'password': data.get('password'),
            'options': {
                'data': {
                    'first_name': data.get('firstName'),
                    'last_name': data.get('lastName'),
                    'role': 'employee'  # Default role
                }
            }
        })
        
        return success_response({
            'message': 'Registration successful',
            'user': auth_response.user
        }, status_code=201)
    except Exception as e:
        logger.error(f"Registration failed: {str(e)}")
        return error_response("Registration failed", 400)