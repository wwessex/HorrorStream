import { Movie } from '../../types';

type Props = {
  movie: Movie;
};

export function getMovieStatus(movie: Movie): { label: string; className: string } {
  if (!movie.isPublished) return { label: 'Hidden', className: 'status-hidden' };
  if (movie.isComingSoon) return { label: 'Coming Soon', className: 'status-coming-soon' };
  if (movie.expirationDate && new Date(movie.expirationDate) < new Date()) {
    return { label: 'Expired', className: 'status-expired' };
  }
  if (movie.publishDate && new Date(movie.publishDate) > new Date()) {
    return { label: 'Scheduled', className: 'status-scheduled' };
  }
  return { label: 'Published', className: 'status-published' };
}

export default function StatusBadge({ movie }: Props) {
  const { label, className } = getMovieStatus(movie);
  return <span className={`status-badge ${className}`}>{label}</span>;
}
