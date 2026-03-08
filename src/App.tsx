import { useState } from 'react';
import { originals, picks, type Pick } from './data';

function shuffle<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function App() {
  const [featured, setFeatured] = useState<Pick[]>(picks);

  return (
    <>
      <header className="hero">
        <nav className="topbar container">
          <div className="brand">Nightfall Vault</div>
          <button className="ghost-btn">Start 7-day free trial</button>
        </nav>
        <div className="hero-content container">
          <p className="eyebrow">Entertainment · Horror & Thrillers</p>
          <h1>Stream daring scares, tense mysteries, and dark originals.</h1>
          <p className="subtitle">
            Nightfall Vault is a curated home for high-impact horror, psychological thrillers, and
            genre-bending series — ad-free, uncensored, and updated every week.
          </p>
          <div className="hero-actions">
            <button className="primary-btn">Try free for 7 days</button>
            <button className="secondary-btn">Browse collection</button>
          </div>
        </div>
      </header>

      <main className="container">
        <section className="section">
          <div className="section-head">
            <h2>Tonight&apos;s picks</h2>
            <button className="link-btn" onClick={() => setFeatured(shuffle(picks))}>
              Shuffle picks
            </button>
          </div>
          <div className="card-grid">
            {featured.map((item) => (
              <article className="card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span className="badge">{item.mood}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="section two-col">
          <article className="panel">
            <h3>Membership that keeps things simple</h3>
            <ul className="features">
              <li>7-day trial with full catalog access</li>
              <li>One monthly plan, cancel anytime in account settings</li>
              <li>Offline-ready watchlist and cross-device syncing</li>
              <li>Support for phone, tablet, and TV casting</li>
            </ul>
          </article>
          <article className="panel">
            <h3>Subscription details</h3>
            <p>
              Payments are charged to your store account at confirmation. Plans renew automatically
              unless canceled at least 24 hours before renewal.
            </p>
            <p>
              Renewal is processed within 24 hours of period end. Manage plans and cancellation
              from your store subscription settings.
            </p>
          </article>
        </section>

        <section className="section">
          <h2>Vault originals</h2>
          <div className="horizontal-row">
            {originals.map((item) => (
              <article className="mini-card" key={item.name}>
                <h4>{item.name}</h4>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section support">
          <h2>Need help?</h2>
          <p>
            If you run into playback or account issues, visit{' '}
            <a href="https://support.nightfallvault.example" target="_blank" rel="noreferrer">
              support.nightfallvault.example
            </a>
          </p>
          <p>
            <a href="#">Privacy policy</a> · <a href="#">Terms of use</a>
          </p>
        </section>
      </main>
    </>
  );
}
