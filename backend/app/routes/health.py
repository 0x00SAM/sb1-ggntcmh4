from flask import Blueprint, jsonify
from app.utils.db import test_db_connection

health_bp = Blueprint('health', __name__, url_prefix='/api')

@health_bp.route('/health')
def health_check():
    """Basic health check endpoint"""
    return jsonify({'status': 'healthy'})

@health_bp.route('/db-health')
def db_health_check():
    """Database health check endpoint"""
    success, message = test_db_connection()
    
    if success:
        return jsonify({
            'status': 'success',
            'message': message
        })
    else:
        return jsonify({
            'status': 'error',
            'message': message
        }), 500