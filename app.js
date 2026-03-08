const picks = [
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

const originals = [
  ['Nocturne House', 'Weekly anthology of one-house stories gone wrong.'],
  ['Thread of Dread', 'A fashion empire with a ritual stitched into every design.'],
  ['Depth Signal', 'A rescue mission receives messages from below the seabed.'],
  ['Tomorrow Sleeps', 'A city where everyone dreams the same nightmare.']
];

const featuredGrid = document.getElementById('featuredGrid');
const originalsRow = document.getElementById('originalsRow');
const shuffleBtn = document.getElementById('shuffleBtn');

function renderFeatured(items) {
  featuredGrid.innerHTML = items
    .map(
      (item) => `
      <article class="card">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <span class="badge">${item.mood}</span>
      </article>
    `
    )
    .join('');
}

function renderOriginals() {
  originalsRow.innerHTML = originals
    .map(
      ([name, copy]) => `
      <article class="mini-card">
        <h4>${name}</h4>
        <p>${copy}</p>
      </article>
    `
    )
    .join('');
}

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

shuffleBtn.addEventListener('click', () => {
  renderFeatured(shuffle(picks));
});

renderFeatured(picks);
renderOriginals();
