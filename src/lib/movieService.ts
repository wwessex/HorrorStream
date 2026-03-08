import { supabase } from './supabase';
import { MovieRow, movieFromRow, movieToRow, Movie } from '../types';

// ── Public queries ──

export async function fetchPublishedMovies(): Promise<Movie[]> {
  const { data, error } = await supabase
    .from('movies')
    .select('*')
    .eq('is_published', true)
    .or('expiration_date.is.null,expiration_date.gt.' + new Date().toISOString())
    .or('publish_date.is.null,publish_date.lte.' + new Date().toISOString())
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data as MovieRow[]).map(movieFromRow);
}

export async function fetchFeaturedMovie(): Promise<Movie | null> {
  const { data, error } = await supabase
    .from('movies')
    .select('*')
    .eq('is_featured', true)
    .eq('is_published', true)
    .or('expiration_date.is.null,expiration_date.gt.' + new Date().toISOString())
    .limit(1)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // no rows
    throw error;
  }
  return movieFromRow(data as MovieRow);
}

export async function fetchMoviesByCategory(categoryKey: string): Promise<Movie[]> {
  if (categoryKey === 'originals') {
    const { data, error } = await supabase
      .from('movies')
      .select('*')
      .eq('is_original', true)
      .eq('is_published', true)
      .or('expiration_date.is.null,expiration_date.gt.' + new Date().toISOString())
      .order('sort_order')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data as MovieRow[]).map(movieFromRow);
  }

  const { data, error } = await supabase
    .from('movies')
    .select('*')
    .contains('categories', [categoryKey])
    .eq('is_published', true)
    .or('expiration_date.is.null,expiration_date.gt.' + new Date().toISOString())
    .order('sort_order')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data as MovieRow[]).map(movieFromRow);
}

export async function fetchMovieBySlug(slug: string): Promise<Movie | null> {
  const { data, error } = await supabase
    .from('movies')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }
  return movieFromRow(data as MovieRow);
}

// ── Admin queries ──

export async function fetchAllMovies(): Promise<Movie[]> {
  const { data, error } = await supabase
    .from('movies')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data as MovieRow[]).map(movieFromRow);
}

export async function createMovie(movie: Partial<Movie>): Promise<Movie> {
  const row = movieToRow(movie);
  const { data, error } = await supabase
    .from('movies')
    .insert(row)
    .select()
    .single();

  if (error) throw error;
  return movieFromRow(data as MovieRow);
}

export async function updateMovie(id: string, movie: Partial<Movie>): Promise<Movie> {
  const row = movieToRow(movie);
  const { data, error } = await supabase
    .from('movies')
    .update(row)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return movieFromRow(data as MovieRow);
}

export async function deleteMovie(id: string): Promise<void> {
  const { error } = await supabase
    .from('movies')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

export async function toggleMovieVisibility(id: string, isPublished: boolean): Promise<void> {
  const { error } = await supabase
    .from('movies')
    .update({ is_published: !isPublished })
    .eq('id', id);

  if (error) throw error;
}

// ── Image uploads ──

export async function uploadImage(file: File, folder: string): Promise<string> {
  const ext = file.name.split('.').pop();
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error } = await supabase.storage
    .from('movie-images')
    .upload(fileName, file, { cacheControl: '3600', upsert: false });

  if (error) throw error;

  const { data } = supabase.storage
    .from('movie-images')
    .getPublicUrl(fileName);

  return data.publicUrl;
}

export async function deleteImage(url: string): Promise<void> {
  // Extract path from full URL
  const match = url.match(/movie-images\/(.+)$/);
  if (!match) return;

  const { error } = await supabase.storage
    .from('movie-images')
    .remove([match[1]]);

  if (error) throw error;
}

// ── Utility ──

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}
