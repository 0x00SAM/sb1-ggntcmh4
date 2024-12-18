# HR Leave Management System

## Prerequisites
- Node.js (v18 or later)
- Python (3.8 or later)
- Git

## Local Development Setup

### Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file in the root directory:
```bash
cp .env.example .env
```

3. Update the `.env` file with your Supabase credentials:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Backend Setup

1. Create and activate a Python virtual environment:

Windows (Command Prompt):
```bash
python -m venv venv
venv\Scripts\activate
```

Windows (PowerShell):
```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

2. Install dependencies:
```bash
cd backend
pip install -r requirements.txt
```

3. Create `.env` file in the backend directory:
```bash
cp .env.example .env
```

4. Update the backend `.env` file:
```
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_service_role_key
JWT_SECRET=your_jwt_secret
```

5. Start the Flask server:
```bash
python run.py
```

The backend API will be available at `http://localhost:5000`

### Testing the Setup

1. Health Check:
```bash
curl http://localhost:5000/api/health
```

2. Database Health Check:
```bash
curl http://localhost:5000/api/db-health
```

### Supabase Setup

1. Create a new Supabase project
2. Create the following tables:

user_profiles:
```sql
create table user_profiles (
  id uuid references auth.users primary key,
  first_name text,
  last_name text,
  email text,
  role text default 'employee',
  created_at timestamp with time zone default timezone('utc'::text, now())
);
```

leave_requests:
```sql
create table leave_requests (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references user_profiles(id),
  type text,
  start_date date,
  end_date date,
  reason text,
  status text default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now())
);
```

3. Set up Row Level Security (RLS) policies:

```sql
-- Enable RLS
alter table user_profiles enable row level security;
alter table leave_requests enable row level security;

-- Policies for user_profiles
create policy "Users can view their own profile"
  on user_profiles for select
  using (auth.uid() = id);

create policy "Admins can view all profiles"
  on user_profiles for select
  using (
    auth.uid() in (
      select id from user_profiles where role = 'admin'
    )
  );

-- Policies for leave_requests
create policy "Users can view their own requests"
  on leave_requests for select
  using (auth.uid() = user_id);

create policy "Admins can view all requests"
  on leave_requests for select
  using (
    auth.uid() in (
      select id from user_profiles where role = 'admin'
    )
  );

create policy "Users can create their own requests"
  on leave_requests for insert
  with check (auth.uid() = user_id);

create policy "Users can update their pending requests"
  on leave_requests for update
  using (
    auth.uid() = user_id 
    and status = 'pending'
  );

create policy "Admins can update any request"
  on leave_requests for update
  using (
    auth.uid() in (
      select id from user_profiles where role = 'admin'
    )
  );
```

## Common Issues and Solutions

### Windows-Specific Issues

1. Path Separators:
   - Use forward slashes (`/`) in import statements
   - Use `os.path.join()` for file operations

2. Port Already in Use:
   - Check if another process is using port 5000 or 5173
   - Use Task Manager to end conflicting processes

3. Python Virtual Environment:
   - If `venv\Scripts\activate` fails, try using PowerShell
   - Ensure Python is added to PATH

### Troubleshooting

1. Frontend Issues:
   - Clear browser cache
   - Check console for errors
   - Verify environment variables

2. Backend Issues:
   - Check Flask debug output
   - Verify Supabase connection
   - Check CORS configuration

3. Database Issues:
   - Verify Supabase credentials
   - Check RLS policies
   - Test database connection# HRLS2
