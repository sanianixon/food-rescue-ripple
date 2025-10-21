-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'staff', 'volunteer', 'ngo');

-- Create enum for food urgency levels
CREATE TYPE public.urgency_level AS ENUM ('low', 'medium', 'high');

-- Create enum for delivery status
CREATE TYPE public.delivery_status AS ENUM ('pending', 'accepted', 'in_transit', 'delivered', 'cancelled');

-- Create profiles table for additional user information
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    phone TEXT,
    organization TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create user_roles table with proper structure
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Create enhanced food_donations table
CREATE TABLE public.food_donations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    staff_id UUID NOT NULL,
    food_type TEXT NOT NULL,
    cuisine_type TEXT,
    main_ingredients TEXT[],
    quantity TEXT NOT NULL,
    quantity_numeric NUMERIC,
    location TEXT NOT NULL,
    pickup_time TIMESTAMP WITH TIME ZONE NOT NULL,
    prep_date TIMESTAMP WITH TIME ZONE,
    expiry_date TIMESTAMP WITH TIME ZONE,
    urgency urgency_level DEFAULT 'medium',
    image_url TEXT,
    is_vegetarian BOOLEAN DEFAULT false,
    is_vegan BOOLEAN DEFAULT false,
    is_gluten_free BOOLEAN DEFAULT false,
    is_dairy_free BOOLEAN DEFAULT false,
    is_halal BOOLEAN DEFAULT false,
    notes TEXT,
    status delivery_status DEFAULT 'pending',
    accepted_by UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create allergens table
CREATE TABLE public.food_allergens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    donation_id UUID NOT NULL REFERENCES public.food_donations(id) ON DELETE CASCADE,
    allergen TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create delivery tracking table
CREATE TABLE public.delivery_tracking (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    donation_id UUID NOT NULL REFERENCES public.food_donations(id) ON DELETE CASCADE,
    volunteer_id UUID NOT NULL,
    current_latitude NUMERIC,
    current_longitude NUMERIC,
    destination_latitude NUMERIC,
    destination_longitude NUMERIC,
    estimated_arrival TIMESTAMP WITH TIME ZONE,
    actual_arrival TIMESTAMP WITH TIME ZONE,
    delivery_notes TEXT,
    delivery_image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create notifications table
CREATE TABLE public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT DEFAULT 'info',
    donation_id UUID REFERENCES public.food_donations(id) ON DELETE CASCADE,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.food_donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.food_allergens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.delivery_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles"
    ON public.profiles FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
    ON public.profiles FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- RLS Policies for user_roles
CREATE POLICY "Anyone can view roles"
    ON public.user_roles FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Only admins can manage roles"
    ON public.user_roles FOR ALL
    TO authenticated
    USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for food_donations
CREATE POLICY "Anyone authenticated can view donations"
    ON public.food_donations FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Staff can create donations"
    ON public.food_donations FOR INSERT
    TO authenticated
    WITH CHECK (public.has_role(auth.uid(), 'staff') OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Staff can update own donations"
    ON public.food_donations FOR UPDATE
    TO authenticated
    USING (staff_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Volunteers can accept donations"
    ON public.food_donations FOR UPDATE
    TO authenticated
    USING (public.has_role(auth.uid(), 'volunteer') OR public.has_role(auth.uid(), 'ngo'));

-- RLS Policies for food_allergens
CREATE POLICY "Anyone authenticated can view allergens"
    ON public.food_allergens FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Staff can manage allergens for their donations"
    ON public.food_allergens FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.food_donations
            WHERE id = donation_id AND (staff_id = auth.uid() OR public.has_role(auth.uid(), 'admin'))
        )
    );

-- RLS Policies for delivery_tracking
CREATE POLICY "Users can view relevant tracking"
    ON public.delivery_tracking FOR SELECT
    TO authenticated
    USING (
        volunteer_id = auth.uid() OR
        public.has_role(auth.uid(), 'admin') OR
        EXISTS (
            SELECT 1 FROM public.food_donations
            WHERE id = donation_id AND staff_id = auth.uid()
        )
    );

CREATE POLICY "Volunteers can insert tracking"
    ON public.delivery_tracking FOR INSERT
    TO authenticated
    WITH CHECK (volunteer_id = auth.uid());

CREATE POLICY "Volunteers can update own tracking"
    ON public.delivery_tracking FOR UPDATE
    TO authenticated
    USING (volunteer_id = auth.uid());

-- RLS Policies for notifications
CREATE POLICY "Users can view own notifications"
    ON public.notifications FOR SELECT
    TO authenticated
    USING (user_id = auth.uid());

CREATE POLICY "Users can update own notifications"
    ON public.notifications FOR UPDATE
    TO authenticated
    USING (user_id = auth.uid());

CREATE POLICY "System can create notifications"
    ON public.notifications FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- Create function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_food_donations_updated_at
    BEFORE UPDATE ON public.food_donations
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_delivery_tracking_updated_at
    BEFORE UPDATE ON public.delivery_tracking
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for critical tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.food_donations;
ALTER PUBLICATION supabase_realtime ADD TABLE public.delivery_tracking;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;