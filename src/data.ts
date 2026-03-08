export type Pick = {
  title: string;
  description: string;
  mood: string;
};

export type Original = {
  name: string;
  copy: string;
};

export const picks: Pick[] = [
  {
    title: 'Static in the Walls',
    description: 'A podcast crew explores a silent apartment where every floor records whispers.',
    mood: 'Paranormal'
  },
  {
    title: 'The Last Broadcast Booth',
    description: 'A late-night host takes calls from listeners predicting crimes before they happen.',
    mood: 'Thriller'
  },
  {
    title: 'Ashwood County',
    description: 'A sheriff reopens a missing-person case tied to an abandoned carnival.',
    mood: 'Mystery'
  },
  {
    title: 'Neon Hollow',
    description: 'In a near-future city, people can rent fear as entertainment — until it escapes.',
    mood: 'Sci-fi Horror'
  },
  {
    title: 'The Salt Chapel',
    description: 'Documentary-style series about modern myths that shouldn’t exist.',
    mood: 'Found Footage'
  },
  {
    title: 'Echo Lake Tapes',
    description: 'Three teens uncover recordings left by a filmmaker who vanished in 1987.',
    mood: 'Coming-of-age horror'
  }
];

export const originals: Original[] = [
  { name: 'Nocturne House', copy: 'Weekly anthology of one-house stories gone wrong.' },
  { name: 'Thread of Dread', copy: 'A fashion empire with a ritual stitched into every design.' },
  { name: 'Depth Signal', copy: 'A rescue mission receives messages from below the seabed.' },
  { name: 'Tomorrow Sleeps', copy: 'A city where everyone dreams the same nightmare.' }
];
