-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User Profiles Table
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID REFERENCES auth.users PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL DEFAULT 'employee',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Leave Requests Table
CREATE TABLE IF NOT EXISTS leave_requests (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES user_profiles(id) NOT NULL,
    type TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    reason TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Function to automatically create user profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_profiles (id, first_name, last_name, email)
    VALUES (
        NEW.id, 
        COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
        COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
        NEW.email
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the handle_new_user function
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to check if the current user is an admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
DECLARE 
    current_user_role TEXT;
BEGIN
    -- Directly query the role without referencing the function to avoid recursion
    SELECT role INTO current_user_role 
    FROM public.user_profiles 
    WHERE id = auth.uid();
    
    RETURN COALESCE(current_user_role = 'admin', false);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_leave_requests_updated_at
    BEFORE UPDATE ON leave_requests
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE leave_requests ENABLE ROW LEVEL SECURITY;

-- User Profiles Policies
-- Individual user can view/update their own profile
CREATE POLICY "Users can view their own profile"
    ON user_profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
    ON user_profiles FOR UPDATE
    USING (auth.uid() = id);

-- Admin policies for user profiles
CREATE POLICY "Admins can view all user profiles"
    ON user_profiles FOR SELECT
    USING (public.is_admin());

CREATE POLICY "Admins can update any user profile"
    ON user_profiles FOR UPDATE
    USING (public.is_admin());

-- Leave Requests Policies
-- Individual user policies
CREATE POLICY "Users can view their own leave requests"
    ON leave_requests FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own leave requests"
    ON leave_requests FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their pending leave requests"
    ON leave_requests FOR UPDATE
    USING (
        auth.uid() = user_id 
        AND status = 'pending'
    );

CREATE POLICY "Users can delete their pending leave requests"
    ON leave_requests FOR DELETE
    USING (
        auth.uid() = user_id 
        AND status = 'pending'
    );

-- Admin policies for leave requests
CREATE POLICY "Admins can view all leave requests"
    ON leave_requests FOR SELECT
    USING (public.is_admin());

CREATE POLICY "Admins can update any leave request"
    ON leave_requests FOR UPDATE
    USING (public.is_admin());

CREATE POLICY "Admins can delete any leave request"
    ON leave_requests FOR DELETE
    USING (public.is_admin());