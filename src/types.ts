// Database row shape (snake_case, matches Supabase)
export type MovieRow = {
  id: string;
  slug: string;
  title: string;
  tagline: string | null;
  description: string | null;
  genre: string | null;
  secondary_genres: string[];
  year: number | null;
  release_date: string | null;
  rating: string | null;
  duration: string | null;
  director: string | null;
  cast_members: string[];
  language: string;
  country: string;
  content_warnings: string[];
  cover_image_url: string | null;
  thumbnail_url: string | null;
  banner_image_url: string | null;
  trailer_url: string | null;
  video_url: string | null;
  gradient: string | null;
  match_percent: number;
  is_original: boolean;
  is_featured: boolean;
  is_published: boolean;
  is_coming_soon: boolean;
  publish_date: string | null;
  expiration_date: string | null;
  categories: string[];
  sort_order: number;
  meta_description: string | null;
  quality_options: string[];
  subtitle_languages: string[];
  audio_languages: string[];
  created_at: string;
  updated_at: string;
};

// Frontend-friendly shape (camelCase)
export type Movie = {
  id: string;
  slug: string;
  title: string;
  tagline: string | null;
  description: string;
  genre: string;
  secondaryGenres: string[];
  year: number;
  releaseDate: string | null;
  rating: string;
  duration: string;
  director: string | null;
  castMembers: string[];
  language: string;
  country: string;
  contentWarnings: string[];
  coverImageUrl: string | null;
  thumbnailUrl: string | null;
  bannerImageUrl: string | null;
  trailerUrl: string | null;
  videoUrl: string | null;
  gradient: string;
  matchPercent: number;
  isOriginal: boolean;
  isFeatured: boolean;
  isPublished: boolean;
  isComingSoon: boolean;
  publishDate: string | null;
  expirationDate: string | null;
  categories: string[];
  sortOrder: number;
  metaDescription: string | null;
  qualityOptions: string[];
  subtitleLanguages: string[];
  audioLanguages: string[];
  createdAt: string;
  updatedAt: string;
};

// Convert DB row to frontend Movie
export function movieFromRow(row: MovieRow): Movie {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    tagline: row.tagline,
    description: row.description ?? '',
    genre: row.genre ?? '',
    secondaryGenres: row.secondary_genres ?? [],
    year: row.year ?? 0,
    releaseDate: row.release_date,
    rating: row.rating ?? '',
    duration: row.duration ?? '',
    director: row.director,
    castMembers: row.cast_members ?? [],
    language: row.language,
    country: row.country,
    contentWarnings: row.content_warnings ?? [],
    coverImageUrl: row.cover_image_url,
    thumbnailUrl: row.thumbnail_url,
    bannerImageUrl: row.banner_image_url,
    trailerUrl: row.trailer_url,
    videoUrl: row.video_url,
    gradient: row.gradient ?? 'linear-gradient(160deg, #1a0a0a 0%, #0d0d0d 100%)',
    matchPercent: row.match_percent,
    isOriginal: row.is_original,
    isFeatured: row.is_featured,
    isPublished: row.is_published,
    isComingSoon: row.is_coming_soon,
    publishDate: row.publish_date,
    expirationDate: row.expiration_date,
    categories: row.categories ?? [],
    sortOrder: row.sort_order,
    metaDescription: row.meta_description,
    qualityOptions: row.quality_options ?? ['1080p'],
    subtitleLanguages: row.subtitle_languages ?? [],
    audioLanguages: row.audio_languages ?? ['English'],
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// Convert frontend Movie back to DB row shape (for inserts/updates)
export function movieToRow(movie: Partial<Movie>): Partial<MovieRow> {
  const row: Record<string, unknown> = {};
  if (movie.slug !== undefined) row.slug = movie.slug;
  if (movie.title !== undefined) row.title = movie.title;
  if (movie.tagline !== undefined) row.tagline = movie.tagline;
  if (movie.description !== undefined) row.description = movie.description;
  if (movie.genre !== undefined) row.genre = movie.genre;
  if (movie.secondaryGenres !== undefined) row.secondary_genres = movie.secondaryGenres;
  if (movie.year !== undefined) row.year = movie.year;
  if (movie.releaseDate !== undefined) row.release_date = movie.releaseDate;
  if (movie.rating !== undefined) row.rating = movie.rating;
  if (movie.duration !== undefined) row.duration = movie.duration;
  if (movie.director !== undefined) row.director = movie.director;
  if (movie.castMembers !== undefined) row.cast_members = movie.castMembers;
  if (movie.language !== undefined) row.language = movie.language;
  if (movie.country !== undefined) row.country = movie.country;
  if (movie.contentWarnings !== undefined) row.content_warnings = movie.contentWarnings;
  if (movie.coverImageUrl !== undefined) row.cover_image_url = movie.coverImageUrl;
  if (movie.thumbnailUrl !== undefined) row.thumbnail_url = movie.thumbnailUrl;
  if (movie.bannerImageUrl !== undefined) row.banner_image_url = movie.bannerImageUrl;
  if (movie.trailerUrl !== undefined) row.trailer_url = movie.trailerUrl;
  if (movie.videoUrl !== undefined) row.video_url = movie.videoUrl;
  if (movie.gradient !== undefined) row.gradient = movie.gradient;
  if (movie.matchPercent !== undefined) row.match_percent = movie.matchPercent;
  if (movie.isOriginal !== undefined) row.is_original = movie.isOriginal;
  if (movie.isFeatured !== undefined) row.is_featured = movie.isFeatured;
  if (movie.isPublished !== undefined) row.is_published = movie.isPublished;
  if (movie.isComingSoon !== undefined) row.is_coming_soon = movie.isComingSoon;
  if (movie.publishDate !== undefined) row.publish_date = movie.publishDate;
  if (movie.expirationDate !== undefined) row.expiration_date = movie.expirationDate;
  if (movie.categories !== undefined) row.categories = movie.categories;
  if (movie.sortOrder !== undefined) row.sort_order = movie.sortOrder;
  if (movie.metaDescription !== undefined) row.meta_description = movie.metaDescription;
  if (movie.qualityOptions !== undefined) row.quality_options = movie.qualityOptions;
  if (movie.subtitleLanguages !== undefined) row.subtitle_languages = movie.subtitleLanguages;
  if (movie.audioLanguages !== undefined) row.audio_languages = movie.audioLanguages;
  return row as Partial<MovieRow>;
}

// Form data shape for create/edit
export type MovieFormData = Omit<Movie, 'id' | 'createdAt' | 'updatedAt'>;

export const EMPTY_MOVIE_FORM: MovieFormData = {
  slug: '',
  title: '',
  tagline: null,
  description: '',
  genre: '',
  secondaryGenres: [],
  year: new Date().getFullYear(),
  releaseDate: null,
  rating: '',
  duration: '',
  director: null,
  castMembers: [],
  language: 'English',
  country: 'US',
  contentWarnings: [],
  coverImageUrl: null,
  thumbnailUrl: null,
  bannerImageUrl: null,
  trailerUrl: null,
  videoUrl: null,
  gradient: 'linear-gradient(160deg, #1a0a0a 0%, #0d0d0d 100%)',
  matchPercent: 85,
  isOriginal: false,
  isFeatured: false,
  isPublished: true,
  isComingSoon: false,
  publishDate: null,
  expirationDate: null,
  categories: [],
  sortOrder: 0,
  metaDescription: null,
  qualityOptions: ['1080p'],
  subtitleLanguages: [],
  audioLanguages: ['English'],
};

// Constants
export const GENRES = [
  'Supernatural Horror',
  'Psychological Horror',
  'Sci-fi Horror',
  'Folk Horror',
  'Found Footage',
  'Thriller',
  'Mystery',
  'Anthology',
  'Eco Horror',
  'Religious Horror',
  'True Crime Horror',
  'Coming-of-age Horror',
  'Paranormal',
  'Occult Thriller',
  'Slasher',
  'Body Horror',
  'Cosmic Horror',
  'Gothic Horror',
  'Zombie',
  'Vampire',
] as const;

export const RATINGS = ['G', 'PG', 'PG-13', 'R', 'NC-17', 'TV-Y', 'TV-Y7', 'TV-G', 'TV-PG', 'TV-14', 'TV-MA'] as const;

export const CATEGORIES = [
  { title: 'Trending Now', key: 'trending' },
  { title: 'DREADFLIX Originals', key: 'originals' },
  { title: 'New Releases', key: 'new-releases' },
  { title: 'Supernatural', key: 'supernatural' },
  { title: 'Psychological Horror', key: 'psychological' },
  { title: 'Sci-Fi Horror', key: 'sci-fi' },
  { title: 'Based on True Events', key: 'true-events' },
] as const;

export const QUALITY_OPTIONS = ['480p', '720p', '1080p', '4K', 'HDR'] as const;
