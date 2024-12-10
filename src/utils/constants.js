export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
  },
  LEAVES: {
    LIST: '/leaves',
    CREATE: '/leaves',
    UPDATE: (id) => `/leaves/${id}`,
    DELETE: (id) => `/leaves/${id}`,
    STATUS: (id) => `/leaves/${id}/status`,
  },
  USERS: {
    LIST: '/users',
    PROFILE: (id) => `/users/${id}`,
    UPDATE: (id) => `/users/${id}`,
  },
  STATS: {
    ATTENDANCE: '/statistics/attendance',
    LEAVES: '/statistics/leaves',
  },
}

export const LEAVE_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
}

export const LEAVE_TYPES = {
  VACATION: { value: 'vacation', label: 'Vacation' },
  SICK: { value: 'sick', label: 'Sick Leave' },
  PERSONAL: { value: 'personal', label: 'Personal Leave' },
  FAMILY: { value: 'family', label: 'Family Time' },
}

export const USER_ROLES = {
  ADMIN: 'admin',
  EMPLOYEE: 'employee',
}

export const DATE_FORMATS = {
  DISPLAY: 'MMM d, yyyy',
  API: 'yyyy-MM-dd',
  SHORT: 'MMM d',
}

export const VALIDATION = {
  PASSWORD: {
    MIN_LENGTH: 8,
    REGEX: {
      UPPERCASE: /[A-Z]/,
      LOWERCASE: /[a-z]/,
      NUMBER: /\d/,
    },
  },
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
}