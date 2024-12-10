"""
Blueprint registration module.
Centralizes blueprint registration for the application.
"""
from flask import Flask
from app.routes.auth import auth_bp
from app.routes.users import users_bp
from app.routes.leaves import leaves_bp

def register_blueprints(app: Flask):
    """Register all blueprints with the application"""
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(users_bp, url_prefix='/api/users')
    app.register_blueprint(leaves_bp, url_prefix='/api/leaves')