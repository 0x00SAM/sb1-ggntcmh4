from flask import jsonify
from typing import Union, Dict, List

def success_response(data: Union[Dict, List] = None, message: str = None, status_code: int = 200):
    """Create a standardized success response"""
    response = {
        'status': 'success',
        'data': data
    }
    if message:
        response['message'] = message
    return jsonify(response), status_code

def error_response(message: str, status_code: int = 400):
    """Create a standardized error response"""
    return jsonify({
        'status': 'error',
        'message': message
    }), status_code