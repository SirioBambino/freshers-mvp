CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
  email TEXT UNIQUE,
  role TEXT CHECK (role IN ('host', 'cleaner')) NOT NULL,
  is_verified BOOLEAN DEFAULT FALSE,
  full_name TEXT,
  avatar_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);


ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for own profile" ON public.profiles
FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Enable update for own profile" ON public.profiles
FOR UPDATE USING (auth.uid() = id);


CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_modtime
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();


CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name, role)
  VALUES (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name',
    new.raw_user_meta_data->>'role'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


CREATE POLICY "Users can upload their own ID"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'identities' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Admins can view all IDs"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'identities' AND 
  (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);
