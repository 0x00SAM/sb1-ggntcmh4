"""
Application factory module.
Creates and configures the Flask application.
"""
from flask import Flask
from flask_cors import CORS
from app.config import Config
from app.routes import register_blueprints
from app.utils.error_handler import register_error_handlers

def create_app(config_class=Config):
    """Create and configure the Flask application"""
    
    # Validate configuration
    try:
        config_class.validate()
    except AttributeError as e:
        raise RuntimeError("Config class does not have a validate method.") from e
    
    # Initialize Flask app
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # Initialize extensions
    CORS(app, resources={
        r"/api/*": {
            "origins": app.config['CORS_ORIGINS'],
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"]
        }
    })
    
    # Register blueprints
    register_blueprints(app)
    
    # Register error handlers
    register_error_handlers(app)
    
    # Health check endpoint
    @app.route('/api/health')
    def health_check():
        return {'status': 'healthy'}
    
    return app
