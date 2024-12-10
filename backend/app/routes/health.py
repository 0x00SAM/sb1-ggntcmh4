from flask import Blueprint, jsonify
from app.utils.db import get_supabase_client

health_bp = Blueprint('health', __name__, url_prefix='/api')

@health_bp.route('/health')
def health_check():
    """Basic health check endpoint"""
    return jsonify({'status': 'healthy'})

@health_bp.route('/db-health')
def db_health_check():
    """Database health check endpoint"""
    try:
        supabase = get_supabase_client()
        # Simple query to test database connection
        response = supabase.table('user_profiles').select('id').limit(1).execute()
        return jsonify({
            'status': 'success',
            'message': 'Database connection successful'
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500