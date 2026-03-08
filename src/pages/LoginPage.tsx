import { useState, FormEvent } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { user, signInWithMagicLink } = useAuth();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (user) return <Navigate to="/" replace />;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const { error: err } = await signInWithMagicLink(email);
    setSubmitting(false);

    if (err) {
      setError(err);
    } else {
      setSent(true);
    }
  };

  return (
    <main className="login-page">
      <div className="login-card">
        <h2 className="login-title">Sign In</h2>
        <p className="login-subtitle">
          Enter your email to receive a magic link
        </p>

        {sent ? (
          <div className="login-sent">
            <div className="login-sent-icon">&#9993;</div>
            <p>Check your email!</p>
            <p className="login-sent-detail">
              We sent a sign-in link to <strong>{email}</strong>
            </p>
            <button
              className="login-btn login-btn-secondary"
              onClick={() => { setSent(false); setEmail(''); }}
            >
              Use a different email
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="login-form">
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="login-input"
              autoFocus
            />
            {error && <p className="login-error">{error}</p>}
            <button
              type="submit"
              disabled={submitting}
              className="login-btn"
            >
              {submitting ? 'Sending...' : 'Send Magic Link'}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
