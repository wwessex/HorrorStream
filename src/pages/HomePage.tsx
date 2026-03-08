import { featuredMovie, categories, getMoviesForCategory } from '../data';
import HeroBanner from '../components/HeroBanner';
import ContentRow from '../components/ContentRow';

export default function HomePage() {
  return (
    <div>
      <HeroBanner movie={featuredMovie} />
      {categories.map((cat) => (
        <ContentRow
          key={cat.key}
          title={cat.title}
          movies={getMoviesForCategory(cat.key)}
        />
      ))}
    </div>
  );
}
