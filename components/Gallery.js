'use client';
import { useEffect, useRef, useState } from 'react';
import ImageCard from './ImageCard';

// Infinite scroll: pehle 12 images, phir scroll karne par aur load hoti hain
export default function Gallery({ images, batch = 12 }) {
  const [count, setCount] = useState(batch);
  const sentinel = useRef(null);
  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setCount((c) => c + batch), { rootMargin: '400px' });
    io.observe(el);
    return () => io.disconnect();
  }, [batch]);
  if (!images.length) return <p className="py-10 text-center text-gray-500">Abhi koi image nahi mili.</p>;
  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {images.slice(0, count).map((img, i) => <ImageCard key={img.slug} img={img} priority={i < 4} />)}
      </div>
      {count < images.length && <div ref={sentinel} className="h-10" aria-hidden />}
    </>
  );
}
