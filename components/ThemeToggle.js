'use client';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => setDark(document.documentElement.classList.contains('dark')), []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    try { localStorage.setItem('theme', next ? 'dark' : 'light'); } catch (e) {}
  };
  return (
    <button onClick={toggle} aria-label="Toggle dark mode" className="rounded-lg border border-red-200 px-3 py-2 text-sm dark:border-red-900">
      {dark ? '☀️' : '🌙'}
    </button>
  );
}
