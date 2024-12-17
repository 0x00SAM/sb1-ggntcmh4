"""
Authentication utility module.
Provides decorators and helpers for authentication.
"""
from functools import wraps
from flask import request, jsonify
from app.utils.db import get_supabase_client
import logging

logger = logging.getLogger(__name__)

def token_required(f):
    """Decorator to verify JWT token"""
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        
        if not token:
            return jsonify({'message': 'Token is missing'}), 401
        
        try:
            # Remove 'Bearer ' prefix if present
            if token.startswith('Bearer '):
                token = token[7:]
            
            supabase = get_supabase_client()
            user = supabase.auth.get_user(token)
            
            # Add user to request context
            request.user = user.user
            
        except Exception as e:
            logger.error(f"Token validation failed: {str(e)}")
            return jsonify({'message': 'Invalid token'}), 401
            
        return f(*args, **kwargs)
    
    return decorated

def admin_required(f):
    """Decorator to verify admin role"""
    @wraps(f)
    @token_required
    def decorated(*args, **kwargs):
        try:
            supabase = get_supabase_client()
            response = supabase.table('user_profiles').select('role').eq('id', request.user.id).single().execute()
            
            if not response.data or response.data.get('role') != 'admin':
                return jsonify({'message': 'Admin privileges required'}), 403
                
        except Exception as e:
            logger.error(f"Admin check failed: {str(e)}")
            return jsonify({'message': 'Authorization check failed'}), 500
            
        return f(*args, **kwargs)
    
    return decorated