import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    """Application configuration"""
    # Supabase configuration
    SUPABASE_URL = os.getenv('SUPABASE_URL')
    SUPABASE_KEY = os.getenv('SUPABASE_KEY')
    
    # Security configuration
    JWT_SECRET = os.getenv('JWT_SECRET', 'your-secret-key')
    
    # CORS configuration
    CORS_ORIGINS = [
        'http://localhost:5173',  # Vite default port
        'http://localhost:3000',  # Alternative React port
        'http://127.0.0.1:5173',
        'http://127.0.0.1:3000'
    ]
    
    # Flask configuration
    DEBUG = os.getenv('FLASK_ENV') == 'development'
    TESTING = False
    
    @staticmethod
    def init_app(app):
        pass