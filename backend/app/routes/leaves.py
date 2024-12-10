"""
Leave management routes module.
Handles leave request endpoints.
"""
from flask import Blueprint, request, jsonify
from app.utils.auth import token_required, admin_required
from app.services.leave_service import LeaveService

leaves_bp = Blueprint('leaves', __name__)
leave_service = LeaveService()

@leaves_bp.route('/', methods=['GET'])
@token_required
def get_leaves():
    """Get leave requests"""
    try:
        user = request.user
        is_admin = user.user_metadata.get('role') == 'admin'
        
        if is_admin:
            # Admins can see all leave requests
            leaves = leave_service.get_all_leaves()
        else:
            # Regular users can only see their own requests
            leaves = leave_service.get_user_leaves(user.id)
            
        return jsonify(leaves), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@leaves_bp.route('/', methods=['POST'])
@token_required
def create_leave():
    """Create new leave request"""
    try:
        data = request.json
        required_fields = ['type', 'start_date', 'end_date', 'reason']
        
        if not data or not all(field in data for field in required_fields):
            return jsonify({'error': 'All fields are required'}), 400
            
        # Add user ID to request data
        data['user_id'] = request.user.id
        
        leave = leave_service.create_leave_request(data)
        return jsonify(leave), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@leaves_bp.route('/<leave_id>', methods=['PUT'])
@token_required
def update_leave(leave_id):
    """Update leave request"""
    try:
        data = request.json
        current_leave = leave_service.get_leave_request(leave_id)
        
        if not current_leave:
            return jsonify({'error': 'Leave request not found'}), 404
            
        # Check if user owns the request or is admin
        is_owner = current_leave['user_id'] == request.user.id
        is_admin = request.user.user_metadata.get('role') == 'admin'
        
        if not (is_owner or is_admin):
            return jsonify({'error': 'Unauthorized'}), 403
            
        # Regular users can only update pending requests
        if not is_admin and current_leave['status'] != 'pending':
            return jsonify({'error': 'Cannot modify non-pending requests'}), 403
            
        leave = leave_service.update_leave_request(leave_id, data)
        return jsonify(leave), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@leaves_bp.route('/<leave_id>', methods=['DELETE'])
@token_required
def delete_leave(leave_id):
    """Delete leave request"""
    try:
        current_leave = leave_service.get_leave_request(leave_id)
        
        if not current_leave:
            return jsonify({'error': 'Leave request not found'}), 404
            
        # Check if user owns the request or is admin
        is_owner = current_leave['user_id'] == request.user.id
        is_admin = request.user.user_metadata.get('role') == 'admin'
        
        if not (is_owner or is_admin):
            return jsonify({'error': 'Unauthorized'}), 403
            
        # Regular users can only delete pending requests
        if not is_admin and current_leave['status'] != 'pending':
            return jsonify({'error': 'Cannot delete non-pending requests'}), 403
            
        leave_service.delete_leave_request(leave_id)
        return jsonify({'message': 'Leave request deleted'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@leaves_bp.route('/<leave_id>/status', methods=['PUT'])
@admin_required
def update_leave_status(leave_id):
    """Update leave request status (admin only)"""
    try:
        data = request.json
        if not data or 'status' not in data:
            return jsonify({'error': 'Status is required'}), 400
            
        if data['status'] not in ['pending', 'approved', 'rejected']:
            return jsonify({'error': 'Invalid status'}), 400
            
        leave = leave_service.update_leave_request(leave_id, {'status': data['status']})
        return jsonify(leave), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500