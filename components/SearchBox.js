'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SearchBox({ className = '' }) {
  const [q, setQ] = useState('');
  const router = useRouter();
  const submit = (e) => {
    e.preventDefault();
    if (q.trim()) router.push(`/search?q=${encodeURIComponent(q.trim())}`);
  };
  return (
    <form onSubmit={submit} role="search" className={`flex gap-2 ${className}`}>
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search saree images, wallpapers..."
        aria-label="Search" className="w-full rounded-lg border border-red-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-brand dark:border-red-900 dark:bg-neutral-900 dark:text-white" />
      <button className="btn" type="submit">Search</button>
    </form>
  );
}
