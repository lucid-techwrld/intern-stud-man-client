import { Check, Eye, EyeOff } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { BRAND } from '../brand';
import { ADMIN_EMAIL } from '../constants';
import { useAuth } from '../hooks/useAuth';
import { splitError } from '../utils';
import { HeroScene } from './HeroScene';
import { Logo } from './Logo';

export default function Login() {
  const { login } = useAuth();
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!password) return setError('Enter your password');
    setBusy(true);
    setError('');
    try { await login(password); }
    catch (x) { const s = splitError(x); setError(s.fields.password || s.banner); }
    finally { setBusy(false); }
  };

  return (
    <div className="login">
      <section className="login-art">
        <Logo />
        <h2>{BRAND.tagline}</h2>
        <ul>{BRAND.features.map((f) => <li key={f}><Check size={18} />{f}</li>)}</ul>
        <HeroScene />
      </section>
      <section className="login-form">
        <form onSubmit={submit} noValidate>
          <span className="mlogo"><Logo /></span>
          <div><h1>Welcome back</h1><p className="sub">Sign in to the admin dashboard.</p></div>
          <label>Email<input value={ADMIN_EMAIL} readOnly aria-readonly="true" autoComplete="username" /></label>
          <label>Password
            <div className="pw">
              <input type={show ? 'text' : 'password'} value={password} onChange={(e) => { setPassword(e.target.value); setError(''); }} autoComplete="current-password" placeholder="Your Intern ID" autoFocus />
              <button type="button" className="icon-btn" onClick={() => setShow((v) => !v)} aria-label={show ? 'Hide password' : 'Show password'}>{show ? <EyeOff size={18} /> : <Eye size={18} />}</button>
            </div>
            <span className="err" role="alert">{error}</span>
          </label>
          <button className="btn" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
          <p className="hint">Use your Intern ID as the password.</p>
        </form>
      </section>
    </div>
  );
}
