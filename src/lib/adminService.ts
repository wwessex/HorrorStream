import { supabase } from './supabase';

export async function isUserAdmin(email: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('admin_users')
    .select('id')
    .eq('email', email)
    .maybeSingle();

  if (error) return false;
  return data !== null;
}
