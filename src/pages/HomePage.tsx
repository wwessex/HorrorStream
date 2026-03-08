import { CATEGORIES } from '../types';
import { useFeaturedMovie, useMoviesByCategory } from '../hooks/useMovies';
import HeroBanner from '../components/HeroBanner';
import ContentRow from '../components/ContentRow';

function CategoryRow({ title, categoryKey }: { title: string; categoryKey: string }) {
  const { movies } = useMoviesByCategory(categoryKey);
  return <ContentRow title={title} movies={movies} />;
}

export default function HomePage() {
  const { movie: featured, loading } = useFeaturedMovie();

  return (
    <div>
      {loading ? (
        <div className="hero hero-loading" />
      ) : featured ? (
        <HeroBanner movie={featured} />
      ) : null}
      {CATEGORIES.map((cat) => (
        <CategoryRow key={cat.key} title={cat.title} categoryKey={cat.key} />
      ))}
    </div>
  );
}
