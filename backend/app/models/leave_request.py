"""
Leave request model module.
Defines the LeaveRequest data model.
"""
from dataclasses import dataclass
from datetime import datetime, date
from typing import Optional

@dataclass
class LeaveRequest:
    id: str
    user_id: str
    type: str
    start_date: date
    end_date: date
    reason: str
    status: str = 'pending'
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    def to_dict(self) -> dict:
        """Convert LeaveRequest instance to dictionary"""
        return {
            'id': self.id,
            'user_id': self.user_id,
            'type': self.type,
            'start_date': self.start_date.isoformat(),
            'end_date': self.end_date.isoformat(),
            'reason': self.reason,
            'status': self.status,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
        }

    @classmethod
    def from_dict(cls, data: dict) -> 'LeaveRequest':
        """Create LeaveRequest instance from dictionary"""
        return cls(
            id=data['id'],
            user_id=data['user_id'],
            type=data['type'],
            start_date=date.fromisoformat(data['start_date']),
            end_date=date.fromisoformat(data['end_date']),
            reason=data['reason'],
            status=data.get('status', 'pending'),
            created_at=datetime.fromisoformat(data['created_at']) if data.get('created_at') else None,
            updated_at=datetime.fromisoformat(data['updated_at']) if data.get('updated_at') else None,
        )