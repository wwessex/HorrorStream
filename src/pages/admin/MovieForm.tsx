import { useState, useEffect, useCallback, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminHeader from '../../components/admin/AdminHeader';
import ImageUploader from '../../components/admin/ImageUploader';
import TagInput from '../../components/admin/TagInput';
import {
  Movie,
  MovieFormData,
  EMPTY_MOVIE_FORM,
  GENRES,
  RATINGS,
  CATEGORIES,
  QUALITY_OPTIONS,
} from '../../types';
import {
  createMovie,
  updateMovie,
  fetchMovieBySlug,
  uploadImage,
  deleteImage,
  generateSlug,
} from '../../lib/movieService';
import { supabase } from '../../lib/supabase';
import { movieFromRow, MovieRow } from '../../types';

type Tab = 'basic' | 'classification' | 'details' | 'media' | 'visibility' | 'streaming' | 'seo';

const TABS: { key: Tab; label: string }[] = [
  { key: 'basic', label: 'Basic Info' },
  { key: 'classification', label: 'Classification' },
  { key: 'details', label: 'Details' },
  { key: 'media', label: 'Media' },
  { key: 'visibility', label: 'Visibility' },
  { key: 'streaming', label: 'Streaming' },
  { key: 'seo', label: 'SEO' },
];

export default function MovieForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState<MovieFormData>({ ...EMPTY_MOVIE_FORM });
  const [activeTab, setActiveTab] = useState<Tab>('basic');
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [unlimitedExpiration, setUnlimitedExpiration] = useState(true);

  // Load existing movie for edit mode
  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('movies')
          .select('*')
          .eq('id', id)
          .single();
        if (fetchError) throw fetchError;
        const movie = movieFromRow(data as MovieRow);
        setForm({
          slug: movie.slug,
          title: movie.title,
          tagline: movie.tagline,
          description: movie.description,
          genre: movie.genre,
          secondaryGenres: movie.secondaryGenres,
          year: movie.year,
          releaseDate: movie.releaseDate,
          rating: movie.rating,
          duration: movie.duration,
          director: movie.director,
          castMembers: movie.castMembers,
          language: movie.language,
          country: movie.country,
          contentWarnings: movie.contentWarnings,
          coverImageUrl: movie.coverImageUrl,
          thumbnailUrl: movie.thumbnailUrl,
          bannerImageUrl: movie.bannerImageUrl,
          trailerUrl: movie.trailerUrl,
          videoUrl: movie.videoUrl,
          gradient: movie.gradient,
          matchPercent: movie.matchPercent,
          isOriginal: movie.isOriginal,
          isFeatured: movie.isFeatured,
          isPublished: movie.isPublished,
          isComingSoon: movie.isComingSoon,
          publishDate: movie.publishDate,
          expirationDate: movie.expirationDate,
          categories: movie.categories,
          sortOrder: movie.sortOrder,
          metaDescription: movie.metaDescription,
          qualityOptions: movie.qualityOptions,
          subtitleLanguages: movie.subtitleLanguages,
          audioLanguages: movie.audioLanguages,
        });
        setUnlimitedExpiration(!movie.expirationDate);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load movie');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const update = useCallback(<K extends keyof MovieFormData>(key: K, value: MovieFormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleTitleChange = (title: string) => {
    update('title', title);
    if (!isEdit || form.slug === generateSlug(form.title)) {
      update('slug', generateSlug(title));
    }
  };

  const handleImageUpload = async (file: File, folder: string, field: 'coverImageUrl' | 'thumbnailUrl' | 'bannerImageUrl') => {
    const url = await uploadImage(file, folder);
    update(field, url);
    return url;
  };

  const handleImageRemove = async (field: 'coverImageUrl' | 'thumbnailUrl' | 'bannerImageUrl') => {
    const url = form[field];
    if (url) {
      try { await deleteImage(url); } catch { /* ignore cleanup errors */ }
    }
    update(field, null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError('Title is required');
      setActiveTab('basic');
      return;
    }
    if (!form.slug.trim()) {
      setError('Slug is required');
      setActiveTab('basic');
      return;
    }

    setSaving(true);
    setError(null);
    try {
      const data: Partial<Movie> = {
        ...form,
        expirationDate: unlimitedExpiration ? null : form.expirationDate,
      };
      if (isEdit && id) {
        await updateMovie(id, data);
      } else {
        await createMovie(data);
      }
      setSuccess(true);
      setTimeout(() => navigate('/admin'), 1500);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to save movie');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-layout">
        <AdminHeader />
        <main className="admin-main">
          <div className="admin-loading">
            <div className="admin-loading-spinner" />
            <p>Loading movie...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <AdminHeader />
      <main className="admin-main">
        <div className="admin-page-header">
          <h1 className="admin-page-title">{isEdit ? 'Edit Movie' : 'Add New Movie'}</h1>
          <button
            type="button"
            className="admin-btn admin-btn-outline"
            onClick={() => navigate('/admin')}
          >
            Back to Movies
          </button>
        </div>

        {error && <div className="admin-error">{error}</div>}
        {success && <div className="admin-success">Movie saved successfully! Redirecting...</div>}

        <form onSubmit={handleSubmit} className="admin-form">
          {/* Tabs */}
          <div className="admin-tabs">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                className={`admin-tab ${activeTab === tab.key ? 'admin-tab-active' : ''}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Basic Info */}
          {activeTab === 'basic' && (
            <div className="admin-form-section">
              <div className="admin-field">
                <label className="admin-label">Title *</label>
                <input
                  className="admin-input"
                  value={form.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Movie title"
                  required
                />
              </div>
              <div className="admin-field">
                <label className="admin-label">Slug *</label>
                <input
                  className="admin-input"
                  value={form.slug}
                  onChange={(e) => update('slug', e.target.value)}
                  placeholder="url-friendly-slug"
                  required
                />
              </div>
              <div className="admin-field">
                <label className="admin-label">Tagline</label>
                <input
                  className="admin-input"
                  value={form.tagline ?? ''}
                  onChange={(e) => update('tagline', e.target.value || null)}
                  placeholder="Short tagline or hook"
                />
              </div>
              <div className="admin-field">
                <label className="admin-label">Description</label>
                <textarea
                  className="admin-textarea"
                  value={form.description}
                  onChange={(e) => update('description', e.target.value)}
                  placeholder="Full movie synopsis..."
                  rows={5}
                />
              </div>
            </div>
          )}

          {/* Classification */}
          {activeTab === 'classification' && (
            <div className="admin-form-section">
              <div className="admin-field">
                <label className="admin-label">Primary Genre</label>
                <select
                  className="admin-select"
                  value={form.genre}
                  onChange={(e) => update('genre', e.target.value)}
                >
                  <option value="">Select genre</option>
                  {GENRES.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>

              <TagInput
                label="Secondary Genres"
                values={form.secondaryGenres}
                onChange={(v) => update('secondaryGenres', v)}
                placeholder="Add genre..."
                suggestions={GENRES}
              />

              <div className="admin-field">
                <label className="admin-label">Categories</label>
                <div className="admin-checkbox-group">
                  {CATEGORIES.map((cat) => (
                    <label key={cat.key} className="admin-checkbox-label">
                      <input
                        type="checkbox"
                        checked={form.categories.includes(cat.key)}
                        onChange={(e) => {
                          const newCats = e.target.checked
                            ? [...form.categories, cat.key]
                            : form.categories.filter((c) => c !== cat.key);
                          update('categories', newCats);
                        }}
                      />
                      {cat.title}
                    </label>
                  ))}
                </div>
              </div>

              <div className="admin-field">
                <label className="admin-label">Rating</label>
                <select
                  className="admin-select"
                  value={form.rating}
                  onChange={(e) => update('rating', e.target.value)}
                >
                  <option value="">Select rating</option>
                  {RATINGS.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Details */}
          {activeTab === 'details' && (
            <div className="admin-form-section">
              <div className="admin-row">
                <div className="admin-field">
                  <label className="admin-label">Year</label>
                  <input
                    type="number"
                    className="admin-input"
                    value={form.year}
                    onChange={(e) => update('year', parseInt(e.target.value) || 0)}
                    min={1900}
                    max={2100}
                  />
                </div>
                <div className="admin-field">
                  <label className="admin-label">Release Date</label>
                  <input
                    type="date"
                    className="admin-input"
                    value={form.releaseDate ?? ''}
                    onChange={(e) => update('releaseDate', e.target.value || null)}
                  />
                </div>
              </div>

              <div className="admin-field">
                <label className="admin-label">Duration</label>
                <input
                  className="admin-input"
                  value={form.duration}
                  onChange={(e) => update('duration', e.target.value)}
                  placeholder="e.g., 1h 47m or 8 Episodes"
                />
              </div>

              <div className="admin-field">
                <label className="admin-label">Director</label>
                <input
                  className="admin-input"
                  value={form.director ?? ''}
                  onChange={(e) => update('director', e.target.value || null)}
                  placeholder="Director name"
                />
              </div>

              <TagInput
                label="Cast Members"
                values={form.castMembers}
                onChange={(v) => update('castMembers', v)}
                placeholder="Add cast member..."
              />

              <div className="admin-row">
                <div className="admin-field">
                  <label className="admin-label">Language</label>
                  <input
                    className="admin-input"
                    value={form.language}
                    onChange={(e) => update('language', e.target.value)}
                    placeholder="English"
                  />
                </div>
                <div className="admin-field">
                  <label className="admin-label">Country</label>
                  <input
                    className="admin-input"
                    value={form.country}
                    onChange={(e) => update('country', e.target.value)}
                    placeholder="US"
                  />
                </div>
              </div>

              <TagInput
                label="Content Warnings"
                values={form.contentWarnings}
                onChange={(v) => update('contentWarnings', v)}
                placeholder="e.g., Violence, Language..."
                suggestions={['Violence', 'Strong Language', 'Gore', 'Sexual Content', 'Drug Use', 'Jump Scares', 'Disturbing Images', 'Nudity', 'Self-Harm', 'Flashing Lights']}
              />
            </div>
          )}

          {/* Media */}
          {activeTab === 'media' && (
            <div className="admin-form-section">
              <ImageUploader
                label="Cover Image"
                currentUrl={form.coverImageUrl}
                onUpload={(file) => handleImageUpload(file, 'covers', 'coverImageUrl')}
                onRemove={() => handleImageRemove('coverImageUrl')}
                aspectHint="Recommended: 2:3 ratio (e.g., 600x900)"
              />

              <ImageUploader
                label="Thumbnail"
                currentUrl={form.thumbnailUrl}
                onUpload={(file) => handleImageUpload(file, 'thumbnails', 'thumbnailUrl')}
                onRemove={() => handleImageRemove('thumbnailUrl')}
                aspectHint="Recommended: 16:9 ratio (e.g., 320x180)"
              />

              <ImageUploader
                label="Banner Image"
                currentUrl={form.bannerImageUrl}
                onUpload={(file) => handleImageUpload(file, 'banners', 'bannerImageUrl')}
                onRemove={() => handleImageRemove('bannerImageUrl')}
                aspectHint="Recommended: 21:9 ratio (e.g., 1920x820)"
              />

              <div className="admin-field">
                <label className="admin-label">Trailer URL</label>
                <input
                  className="admin-input"
                  value={form.trailerUrl ?? ''}
                  onChange={(e) => update('trailerUrl', e.target.value || null)}
                  placeholder="https://..."
                />
              </div>

              <div className="admin-field">
                <label className="admin-label">Video URL</label>
                <input
                  className="admin-input"
                  value={form.videoUrl ?? ''}
                  onChange={(e) => update('videoUrl', e.target.value || null)}
                  placeholder="https://..."
                />
              </div>

              <div className="admin-field">
                <label className="admin-label">Gradient Fallback</label>
                <input
                  className="admin-input"
                  value={form.gradient}
                  onChange={(e) => update('gradient', e.target.value)}
                  placeholder="linear-gradient(160deg, #1a0a0a 0%, #0d0d0d 100%)"
                />
                <div
                  className="admin-gradient-preview"
                  style={{ background: form.gradient }}
                />
              </div>
            </div>
          )}

          {/* Visibility & Scheduling */}
          {activeTab === 'visibility' && (
            <div className="admin-form-section">
              <div className="admin-toggle-group">
                <label className="admin-toggle">
                  <input
                    type="checkbox"
                    checked={form.isPublished}
                    onChange={(e) => update('isPublished', e.target.checked)}
                  />
                  <span className="admin-toggle-slider" />
                  <span className="admin-toggle-label">Published (visible on site)</span>
                </label>

                <label className="admin-toggle">
                  <input
                    type="checkbox"
                    checked={form.isComingSoon}
                    onChange={(e) => update('isComingSoon', e.target.checked)}
                  />
                  <span className="admin-toggle-slider" />
                  <span className="admin-toggle-label">Coming Soon</span>
                </label>

                <label className="admin-toggle">
                  <input
                    type="checkbox"
                    checked={form.isFeatured}
                    onChange={(e) => update('isFeatured', e.target.checked)}
                  />
                  <span className="admin-toggle-slider" />
                  <span className="admin-toggle-label">Featured (show in hero banner)</span>
                </label>

                <label className="admin-toggle">
                  <input
                    type="checkbox"
                    checked={form.isOriginal}
                    onChange={(e) => update('isOriginal', e.target.checked)}
                  />
                  <span className="admin-toggle-slider" />
                  <span className="admin-toggle-label">DREADFLIX Original</span>
                </label>
              </div>

              <div className="admin-field">
                <label className="admin-label">Publish Date</label>
                <input
                  type="datetime-local"
                  className="admin-input"
                  value={form.publishDate ? form.publishDate.slice(0, 16) : ''}
                  onChange={(e) => update('publishDate', e.target.value ? new Date(e.target.value).toISOString() : null)}
                />
                <span className="admin-field-hint">Leave empty to publish immediately when Published is enabled</span>
              </div>

              <div className="admin-field">
                <label className="admin-toggle">
                  <input
                    type="checkbox"
                    checked={unlimitedExpiration}
                    onChange={(e) => {
                      setUnlimitedExpiration(e.target.checked);
                      if (e.target.checked) update('expirationDate', null);
                    }}
                  />
                  <span className="admin-toggle-slider" />
                  <span className="admin-toggle-label">Unlimited (never expires)</span>
                </label>
              </div>

              {!unlimitedExpiration && (
                <div className="admin-field">
                  <label className="admin-label">Expiration Date</label>
                  <input
                    type="datetime-local"
                    className="admin-input"
                    value={form.expirationDate ? form.expirationDate.slice(0, 16) : ''}
                    onChange={(e) => update('expirationDate', e.target.value ? new Date(e.target.value).toISOString() : null)}
                  />
                </div>
              )}

              <div className="admin-field">
                <label className="admin-label">Sort Order</label>
                <input
                  type="number"
                  className="admin-input"
                  value={form.sortOrder}
                  onChange={(e) => update('sortOrder', parseInt(e.target.value) || 0)}
                />
                <span className="admin-field-hint">Lower numbers appear first</span>
              </div>
            </div>
          )}

          {/* Streaming */}
          {activeTab === 'streaming' && (
            <div className="admin-form-section">
              <div className="admin-field">
                <label className="admin-label">Quality Options</label>
                <div className="admin-checkbox-group">
                  {QUALITY_OPTIONS.map((q) => (
                    <label key={q} className="admin-checkbox-label">
                      <input
                        type="checkbox"
                        checked={form.qualityOptions.includes(q)}
                        onChange={(e) => {
                          const newQ = e.target.checked
                            ? [...form.qualityOptions, q]
                            : form.qualityOptions.filter((v) => v !== q);
                          update('qualityOptions', newQ);
                        }}
                      />
                      {q}
                    </label>
                  ))}
                </div>
              </div>

              <TagInput
                label="Subtitle Languages"
                values={form.subtitleLanguages}
                onChange={(v) => update('subtitleLanguages', v)}
                placeholder="Add language..."
                suggestions={['English', 'Spanish', 'French', 'German', 'Japanese', 'Korean', 'Portuguese', 'Italian', 'Chinese', 'Arabic']}
              />

              <TagInput
                label="Audio Languages"
                values={form.audioLanguages}
                onChange={(v) => update('audioLanguages', v)}
                placeholder="Add language..."
                suggestions={['English', 'Spanish', 'French', 'German', 'Japanese', 'Korean', 'Portuguese', 'Italian']}
              />
            </div>
          )}

          {/* SEO */}
          {activeTab === 'seo' && (
            <div className="admin-form-section">
              <div className="admin-field">
                <label className="admin-label">Meta Description</label>
                <textarea
                  className="admin-textarea"
                  value={form.metaDescription ?? ''}
                  onChange={(e) => update('metaDescription', e.target.value || null)}
                  placeholder="SEO description (150-160 characters recommended)"
                  rows={3}
                  maxLength={300}
                />
                <span className="admin-field-hint">
                  {(form.metaDescription ?? '').length}/160 characters
                </span>
              </div>

              <div className="admin-field">
                <label className="admin-label">Match Percent</label>
                <div className="admin-range-group">
                  <input
                    type="range"
                    min={50}
                    max={99}
                    value={form.matchPercent}
                    onChange={(e) => update('matchPercent', parseInt(e.target.value))}
                    className="admin-range"
                  />
                  <span className="admin-range-value">{form.matchPercent}%</span>
                </div>
              </div>
            </div>
          )}

          {/* Submit */}
          <div className="admin-form-footer">
            <button
              type="button"
              className="admin-btn admin-btn-outline"
              onClick={() => navigate('/admin')}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="admin-btn admin-btn-primary"
              disabled={saving}
            >
              {saving ? 'Saving...' : isEdit ? 'Update Movie' : 'Add Movie'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
