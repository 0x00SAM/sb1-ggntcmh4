#!/bin/bash

# Create project directory structure
mkdir -p src/{components,contexts,hooks,lib,pages,services,styles}/{admin,auth,dashboard,employee,leave,shared}

# Create necessary files
touch src/components/admin/{EmployeeList,QuickActionCheckbox}.jsx
touch src/components/auth/{AuthLayout,FormInput,Logo}.jsx
touch src/components/dashboard/{AttendanceChart,Calendar,LeaveRequestsTable,LeaveStatistics,SummaryCard}.jsx
touch src/components/leave/{DeleteConfirmationDialog,LeaveRequestForm}.jsx
touch src/components/shared/{ErrorBoundary,LoadingSpinner,Navbar,ProfileModal,Sidebar}.jsx
touch src/contexts/{AuthContext,LeaveContext}.jsx
touch src/hooks/{useApi,useEmployees}.js
touch src/lib/supabaseClient.js
touch src/pages/admin/{Dashboard,EmployeeLeaveDetails}.jsx
touch src/pages/auth/{Login,Register}.jsx
touch src/pages/employee/{Dashboard,LeaveRequest}.jsx
touch src/services/api.js
touch src/styles/auth.css

# Create configuration files
touch .env .env.example postcss.config.js tailwind.config.js