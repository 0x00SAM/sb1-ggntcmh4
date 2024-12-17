from supabase import create_client, Client
from app.config import Config
import logging

logger = logging.getLogger(__name__)

_supabase_client = None

def get_supabase_client() -> Client:
    """Initialize and return Supabase client (singleton pattern)"""
    global _supabase_client
    
    if _supabase_client is None:
        if not Config.SUPABASE_URL or not Config.SUPABASE_KEY:
            raise ValueError("Supabase credentials not configured")
            
        try:
            _supabase_client = create_client(
                Config.SUPABASE_URL,
                Config.SUPABASE_KEY
            )
            logger.info("Supabase client initialized successfully")
        except Exception as e:
            logger.error(f"Failed to initialize Supabase client: {str(e)}")
            raise Exception(f"Failed to initialize Supabase client: {str(e)}")
    
    return _supabase_client

def test_db_connection():
    """Test the database connection"""
    try:
        client = get_supabase_client()
        # Simple query to test connection
        response = client.table('user_profiles').select('id').limit(1).execute()
        return True, "Database connection successful"
    except Exception as e:
        logger.error(f"Database connection test failed: {str(e)}")
        return False, str(e)