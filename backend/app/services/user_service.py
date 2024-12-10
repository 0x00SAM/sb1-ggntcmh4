"""
User service module.
Handles user-related business logic and database operations.
"""
from typing import List, Optional, Dict
from app.utils.supabase_client import get_supabase_client

class UserService:
    def __init__(self):
        self.supabase = get_supabase_client()
    
    def get_user(self, user_id: str) -> Optional[Dict]:
        """Get user by ID"""
        try:
            response = self.supabase.table('user_profiles').select('*').eq('id', user_id).single().execute()
            return response.data if response.data else None
        except Exception as e:
            raise Exception(f"Failed to fetch user: {str(e)}")
    
    def get_all_users(self) -> List[Dict]:
        """Get all users"""
        try:
            response = self.supabase.table('user_profiles').select('*').execute()
            return response.data
        except Exception as e:
            raise Exception(f"Failed to fetch users: {str(e)}")
    
    def update_user(self, user_id: str, user_data: Dict) -> Dict:
        """Update user profile"""
        try:
            response = self.supabase.table('user_profiles').update(user_data).eq('id', user_id).execute()
            return response.data[0] if response.data else None
        except Exception as e:
            raise Exception(f"Failed to update user: {str(e)}")
    
    def create_user_profile(self, user_id: str, profile_data: Dict) -> Dict:
        """Create user profile"""
        try:
            data = {
                'id': user_id,
                **profile_data
            }
            response = self.supabase.table('user_profiles').insert(data).execute()
            return response.data[0] if response.data else None
        except Exception as e:
            raise Exception(f"Failed to create user profile: {str(e)}")