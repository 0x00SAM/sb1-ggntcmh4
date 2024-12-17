"""
User service module.
Handles user-related business logic and database operations.
"""
from typing import Optional, List
from app.models.user import User
from app.utils.db import get_supabase_client
import logging

logger = logging.getLogger(__name__)

class UserService:
    def __init__(self):
        self.supabase = get_supabase_client()

    def get_user(self, user_id: str) -> Optional[User]:
        try:
            response = self.supabase.table('user_profiles').select('*').eq('id', user_id).single().execute()
            if response.data:
                return User(**response.data)
            return None
        except Exception as e:
            logger.error(f"Failed to fetch user {user_id}: {str(e)}")
            raise

    def get_user_by_email(self, email: str) -> Optional[User]:
        try:
            response = self.supabase.table('user_profiles').select('*').eq('email', email).single().execute()
            if response.data:
                return User(**response.data)
            return None
        except Exception as e:
            logger.error(f"Failed to fetch user by email {email}: {str(e)}")
            raise

    def create_user(self, user_data: dict) -> User:
        try:
            response = self.supabase.table('user_profiles').insert(user_data).execute()
            return User(**response.data[0])
        except Exception as e:
            logger.error(f"Failed to create user: {str(e)}")
            raise

    def update_user(self, user_id: str, user_data: dict) -> User:
        try:
            response = self.supabase.table('user_profiles').update(user_data).eq('id', user_id).execute()
            return User(**response.data[0])
        except Exception as e:
            logger.error(f"Failed to update user {user_id}: {str(e)}")
            raise