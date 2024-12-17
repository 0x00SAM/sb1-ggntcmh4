from datetime import datetime
from typing import Dict, Optional, Tuple

def validate_leave_request(data: Dict) -> Tuple[bool, Optional[str]]:
    """Validate leave request data"""
    required_fields = ['type', 'start_date', 'end_date']
    
    # Check required fields
    for field in required_fields:
        if field not in data:
            return False, f"Missing required field: {field}"
            
    try:
        # Validate dates
        start_date = datetime.strptime(data['start_date'], '%Y-%m-%d').date()
        end_date = datetime.strptime(data['end_date'], '%Y-%m-%d').date()
        
        if start_date > end_date:
            return False, "Start date cannot be after end date"
            
        if start_date < datetime.now().date():
            return False, "Cannot create leave request for past dates"
            
    except ValueError:
        return False, "Invalid date format. Use YYYY-MM-DD"
        
    return True, None