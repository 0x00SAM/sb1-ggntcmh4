# HR Leave Management System Backend

This is the Flask backend for the HR Leave Management System.

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Copy `.env.example` to `.env` and fill in your Supabase credentials:
```bash
cp .env.example .env
```

4. Run the development server:
```bash
python app.py
```

## API Endpoints

### User Management
- GET /api/users - List all users (admin only)
- GET /api/users/:id - Get user details
- PUT /api/users/:id - Update user profile

### Leave Management
- GET /api/leaves - List leave requests (filtered by user role)
- POST /api/leaves - Create new leave request
- PUT /api/leaves/:id - Update leave request
- DELETE /api/leaves/:id - Delete leave request
- PUT /api/leaves/:id/status - Update leave request status (admin only)

### Statistics
- GET /api/statistics/attendance - Get attendance statistics
- GET /api/statistics/leaves - Get leave statistics