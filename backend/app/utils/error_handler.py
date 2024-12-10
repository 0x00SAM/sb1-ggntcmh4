"""
Error handling utility module.
Provides centralized error handling for the application.
"""
from flask import jsonify
from werkzeug.exceptions import HTTPException

def handle_http_error(error):
    """Handle HTTP errors"""
    if isinstance(error, HTTPException):
        response = {
            'error': error.__class__.__name__,
            'message': str(error)
        }
        return jsonify(response), error.code
    
    # Handle non-HTTP exceptions
    return jsonify({
        'error': 'InternalServerError',
        'message': 'An unexpected error occurred'
    }), 500

def handle_validation_error(error):
    """Handle validation errors"""
    return jsonify({
        'error': 'ValidationError',
        'message': str(error)
    }), 400

def handle_database_error(error):
    """Handle database-related errors"""
    return jsonify({
        'error': 'DatabaseError',
        'message': str(error)
    }), 500

def register_error_handlers(app):
    """Register error handlers with the Flask app"""
    app.register_error_handler(Exception, handle_http_error)
    app.register_error_handler(400, handle_validation_error)
    app.register_error_handler(500, handle_database_error)