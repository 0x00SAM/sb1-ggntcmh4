"""
Leave service module.
Handles leave request business logic and database operations.
"""
from typing import List, Optional
from datetime import datetime
from app.models.leave_request import LeaveRequest
from app.utils.db import get_supabase_client
import logging

logger = logging.getLogger(__name__)

class LeaveService:
    def __init__(self):
        self.supabase = get_supabase_client()

    def get_leave_request(self, request_id: str) -> Optional[LeaveRequest]:
        """Get a single leave request by ID"""
        try:
            response = self.supabase.table('leave_requests').select('*').eq('id', request_id).single().execute()
            return LeaveRequest(**response.data) if response.data else None
        except Exception as e:
            logger.error(f"Failed to fetch leave request {request_id}: {str(e)}")
            raise

    def get_user_leaves(self, user_id: str) -> List[LeaveRequest]:
        """Get all leave requests for a user"""
        try:
            response = self.supabase.table('leave_requests').select('*').eq('user_id', user_id).execute()
            return [LeaveRequest(**data) for data in response.data]
        except Exception as e:
            logger.error(f"Failed to fetch leaves for user {user_id}: {str(e)}")
            raise

    def create_leave_request(self, user_id: str, leave_data: dict) -> LeaveRequest:
        """Create a new leave request"""
        try:
            data = {
                'user_id': user_id,
                **leave_data,
                'created_at': datetime.utcnow().isoformat()
            }
            response = self.supabase.table('leave_requests').insert(data).execute()
            return LeaveRequest(**response.data[0])
        except Exception as e:
            logger.error(f"Failed to create leave request: {str(e)}")
            raise

    def update_leave_request(self, request_id: str, updates: dict) -> LeaveRequest:
        """Update a leave request"""
        try:
            response = self.supabase.table('leave_requests').update(updates).eq('id', request_id).execute()
            return LeaveRequest(**response.data[0])
        except Exception as e:
            logger.error(f"Failed to update leave request {request_id}: {str(e)}")
            raise

    def delete_leave_request(self, request_id: str) -> bool:
        """Delete a leave request"""
        try:
            self.supabase.table('leave_requests').delete().eq('id', request_id).execute()
            return True
        except Exception as e:
            logger.error(f"Failed to delete leave request {request_id}: {str(e)}")
            raise