from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from supabase import create_client, Client
import os
from functools import wraps
import jwt

load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize Supabase client
supabase: Client = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_KEY")
)

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        
        if not token:
            return jsonify({'message': 'Token is missing'}), 401
        
        try:
            # Remove 'Bearer ' prefix if present
            if token.startswith('Bearer '):
                token = token[7:]
            
            # Verify token with Supabase
            user = supabase.auth.get_user(token)
            request.user = user
            
        except Exception as e:
            return jsonify({'message': 'Token is invalid'}), 401
            
        return f(*args, **kwargs)
    
    return decorated

# User Management Routes
@app.route('/api/users', methods=['GET'])
@token_required
def get_users():
    try:
        response = supabase.table('user_profiles').select('*').execute()
        return jsonify(response.data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/users/<user_id>', methods=['GET'])
@token_required
def get_user(user_id):
    try:
        response = supabase.table('user_profiles').select('*').eq('id', user_id).single().execute()
        return jsonify(response.data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/users/<user_id>', methods=['PUT'])
@token_required
def update_user(user_id):
    try:
        data = request.json
        response = supabase.table('user_profiles').update(data).eq('id', user_id).execute()
        return jsonify(response.data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Leave Management Routes
@app.route('/api/leaves', methods=['GET'])
@token_required
def get_leaves():
    try:
        user = request.user
        is_admin = user.user_metadata.get('role') == 'admin'
        
        query = supabase.table('leave_requests').select('*')
        if not is_admin:
            query = query.eq('user_id', user.id)
            
        response = query.execute()
        return jsonify(response.data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/leaves', methods=['POST'])
@token_required
def create_leave():
    try:
        data = request.json
        data['user_id'] = request.user.id
        response = supabase.table('leave_requests').insert(data).execute()
        return jsonify(response.data), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/leaves/<leave_id>', methods=['PUT'])
@token_required
def update_leave(leave_id):
    try:
        data = request.json
        response = supabase.table('leave_requests').update(data).eq('id', leave_id).execute()
        return jsonify(response.data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/leaves/<leave_id>', methods=['DELETE'])
@token_required
def delete_leave(leave_id):
    try:
        response = supabase.table('leave_requests').delete().eq('id', leave_id).execute()
        return jsonify({'message': 'Leave request deleted'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/leaves/<leave_id>/status', methods=['PUT'])
@token_required
def update_leave_status(leave_id):
    try:
        user = request.user
        if user.user_metadata.get('role') != 'admin':
            return jsonify({'error': 'Unauthorized'}), 403
            
        data = request.json
        response = supabase.table('leave_requests').update({
            'status': data['status']
        }).eq('id', leave_id).execute()
        return jsonify(response.data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Statistics Routes
@app.route('/api/statistics/attendance', methods=['GET'])
@token_required
def get_attendance_statistics():
    try:
        # Implement attendance statistics logic
        response = {
            'present': 104,
            'absent': 16
        }
        return jsonify(response), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/statistics/leaves', methods=['GET'])
@token_required
def get_leave_statistics():
    try:
        user_id = request.args.get('user_id', request.user.id)
        timeframe = request.args.get('timeframe', '6')  # 6 or 12 months
        
        # Implement leave statistics logic
        response = {
            'data': [
                {'month': 'Jan', 'days': 2},
                {'month': 'Feb', 'days': 3},
                {'month': 'Mar', 'days': 7},
                {'month': 'Apr', 'days': 2},
                {'month': 'May', 'days': 1},
                {'month': 'Jun', 'days': 4}
            ]
        }
        return jsonify(response), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)