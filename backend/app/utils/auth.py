"""
Authentication utility module.
Provides decorators and helpers for authentication.
"""
from functools import wraps
from flask import request, jsonify
from app.utils.supabase_client import get_supabase_client

def token_required(f):
    """Decorator to verify JWT token"""
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        
        if not token:
            return jsonify({'error': 'Token is missing'}), 401
        
        try:
            # Remove 'Bearer ' prefix if present
            if token.startswith('Bearer '):
                token = token[7:]
            
            # Verify token with Supabase
            supabase = get_supabase_client()
            user = supabase.auth.get_user(token)
            
            # Add user to request context
            request.user = user.user
            
        except Exception as e:
            return jsonify({'error': f'Invalid token: {str(e)}'}), 401
            
        return f(*args, **kwargs)
    
    return decorated

def admin_required(f):
    """Decorator to verify admin role"""
    @wraps(f)
    @token_required
    def decorated(*args, **kwargs):
        if request.user.user_metadata.get('role') != 'admin':
            return jsonify({'error': 'Admin privileges required'}), 403
        return f(*args, **kwargs)
    
    return decorated