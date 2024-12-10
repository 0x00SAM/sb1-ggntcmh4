"""
Leave service module.
Handles leave request business logic and database operations.
"""
from typing import List, Optional, Dict
from datetime import datetime
from app.utils.supabase_client import get_supabase_client

class LeaveService:
    def __init__(self):
        self.supabase = get_supabase_client()
    
    def get_leave_request(self, request_id: str) -> Optional[Dict]:
        """Get leave request by ID"""
        try:
            response = self.supabase.table('leave_requests').select('*').eq('id', request_id).single().execute()
            return response.data if response.data else None
        except Exception as e:
            raise Exception(f"Failed to fetch leave request: {str(e)}")
    
    def get_user_leaves(self, user_id: str) -> List[Dict]:
        """Get leave requests for a user"""
        try:
            response = self.supabase.table('leave_requests').select('*').eq('user_id', user_id).execute()
            return response.data
        except Exception as e:
            raise Exception(f"Failed to fetch user leaves: {str(e)}")
    
    def create_leave_request(self, leave_data: Dict) -> Dict:
        """Create new leave request"""
        try:
            data = {
                **leave_data,
                'created_at': datetime.utcnow().isoformat(),
                'status': 'pending'
            }
            response = self.supabase.table('leave_requests').insert(data).execute()
            return response.data[0] if response.data else None
        except Exception as e:
            raise Exception(f"Failed to create leave request: {str(e)}")
    
    def update_leave_request(self, request_id: str, updates: Dict) -> Dict:
        """Update leave request"""
        try:
            response = self.supabase.table('leave_requests').update(updates).eq('id', request_id).execute()
            return response.data[0] if response.data else None
        except Exception as e:
            raise Exception(f"Failed to update leave request: {str(e)}")
    
    def delete_leave_request(self, request_id: str) -> bool:
        """Delete leave request"""
        try:
            self.supabase.table('leave_requests').delete().eq('id', request_id).execute()
            return True
        except Exception as e:
            raise Exception(f"Failed to delete leave request: {str(e)}")