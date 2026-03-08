export type Movie = {
  title: string;
  description: string;
  genre: string;
  year: number;
  rating: string;
  duration: string;
  matchPercent: number;
  gradient: string;
  isOriginal: boolean;
};

export const featuredMovie: Movie = {
  title: 'The Hollow House',
  description:
    'A family moves into a centuries-old farmhouse only to discover that something ancient and hungry lives beneath the floorboards. As the walls begin to whisper, they must uncover the house\'s dark history before it consumes them all.',
  genre: 'Supernatural Horror',
  year: 2024,
  rating: 'R',
  duration: '1h 47m',
  matchPercent: 97,
  gradient: 'linear-gradient(135deg, #1a0000 0%, #0d0d0d 30%, #000 100%)',
  isOriginal: true,
};

export const movies: Movie[] = [
  {
    title: 'Static in the Walls',
    description: 'A podcast crew explores a silent apartment where every floor records whispers.',
    genre: 'Paranormal',
    year: 2024,
    rating: 'TV-14',
    duration: '8 Episodes',
    matchPercent: 92,
    gradient: 'linear-gradient(160deg, #1a0a2e 0%, #0d0d0d 100%)',
    isOriginal: false,
  },
  {
    title: 'The Last Broadcast Booth',
    description: 'A late-night host takes calls from listeners predicting crimes before they happen.',
    genre: 'Thriller',
    year: 2023,
    rating: 'TV-MA',
    duration: '1h 58m',
    matchPercent: 89,
    gradient: 'linear-gradient(160deg, #2e0a0a 0%, #0d0d0d 100%)',
    isOriginal: false,
  },
  {
    title: 'Ashwood County',
    description: 'A sheriff reopens a missing-person case tied to an abandoned carnival.',
    genre: 'Mystery',
    year: 2024,
    rating: 'TV-MA',
    duration: '10 Episodes',
    matchPercent: 95,
    gradient: 'linear-gradient(160deg, #0a1a0a 0%, #0d0d0d 100%)',
    isOriginal: false,
  },
  {
    title: 'Neon Hollow',
    description: 'In a near-future city, people can rent fear as entertainment — until it escapes.',
    genre: 'Sci-fi Horror',
    year: 2025,
    rating: 'R',
    duration: '1h 42m',
    matchPercent: 88,
    gradient: 'linear-gradient(160deg, #0a0a2e 0%, #1a0020 50%, #0d0d0d 100%)',
    isOriginal: false,
  },
  {
    title: 'The Salt Chapel',
    description: 'Documentary-style series about modern myths that shouldn\'t exist.',
    genre: 'Found Footage',
    year: 2023,
    rating: 'TV-14',
    duration: '6 Episodes',
    matchPercent: 84,
    gradient: 'linear-gradient(160deg, #1a1a0a 0%, #0d0d0d 100%)',
    isOriginal: false,
  },
  {
    title: 'Echo Lake Tapes',
    description: 'Three teens uncover recordings left by a filmmaker who vanished in 1987.',
    genre: 'Coming-of-age Horror',
    year: 2024,
    rating: 'PG-13',
    duration: '1h 34m',
    matchPercent: 91,
    gradient: 'linear-gradient(160deg, #0a1a2e 0%, #0d0d0d 100%)',
    isOriginal: false,
  },
  {
    title: 'Nocturne House',
    description: 'Weekly anthology of one-house stories gone wrong.',
    genre: 'Anthology',
    year: 2024,
    rating: 'TV-MA',
    duration: '12 Episodes',
    matchPercent: 93,
    gradient: 'linear-gradient(160deg, #2e0a1a 0%, #0d0d0d 100%)',
    isOriginal: true,
  },
  {
    title: 'Thread of Dread',
    description: 'A fashion empire with a ritual stitched into every design.',
    genre: 'Occult Thriller',
    year: 2025,
    rating: 'TV-MA',
    duration: '8 Episodes',
    matchPercent: 86,
    gradient: 'linear-gradient(160deg, #1a0a1a 0%, #0d0d0d 100%)',
    isOriginal: true,
  },
  {
    title: 'Depth Signal',
    description: 'A rescue mission receives messages from below the seabed.',
    genre: 'Sci-fi Horror',
    year: 2024,
    rating: 'R',
    duration: '1h 51m',
    matchPercent: 90,
    gradient: 'linear-gradient(160deg, #0a0a1a 0%, #001a2e 50%, #0d0d0d 100%)',
    isOriginal: true,
  },
  {
    title: 'Tomorrow Sleeps',
    description: 'A city where everyone dreams the same nightmare.',
    genre: 'Psychological Horror',
    year: 2025,
    rating: 'TV-MA',
    duration: '6 Episodes',
    matchPercent: 87,
    gradient: 'linear-gradient(160deg, #1a0a0a 0%, #0d0d1a 50%, #0d0d0d 100%)',
    isOriginal: true,
  },
];
