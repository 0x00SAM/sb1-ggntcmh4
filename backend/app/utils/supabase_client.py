"""
Supabase client utility module.
Provides a singleton instance of the Supabase client.
"""
from supabase import create_client, Client
from app.config import Config

_supabase_client: Client = None

def get_supabase_client() -> Client:
    """Get or create Supabase client instance"""
    global _supabase_client
    
    if _supabase_client is None:
        if not Config.SUPABASE_URL or not Config.SUPABASE_KEY:
            raise ValueError("Supabase credentials not configured")
            
        try:
            _supabase_client = create_client(
                Config.SUPABASE_URL,
                Config.SUPABASE_KEY
            )
        except Exception as e:
            raise Exception(f"Failed to initialize Supabase client: {str(e)}")
    
    return _supabase_client