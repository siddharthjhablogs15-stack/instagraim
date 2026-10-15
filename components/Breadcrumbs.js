import Link from 'next/link';
import JsonLd from './JsonLd';
import { SITE } from '@/lib/data';

// items: [{name, href}] (last item = current page, href optional)
export default function Breadcrumbs({ items }) {
  const all = [{ name: 'Home', href: '/' }, ...items];
  const schema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: all.map((it, i) => ({
      '@type': 'ListItem', position: i + 1, name: it.name,
      ...(it.href ? { item: SITE.url + it.href } : {}),
    })),
  };
  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-sm text-gray-600 dark:text-gray-400">
      <JsonLd data={schema} />
      <ol className="flex flex-wrap gap-2">
        {all.map((it, i) => (
          <li key={i} className="flex gap-2">
            {it.href && i < all.length - 1 ? <Link href={it.href} className="hover:text-brand">{it.name}</Link> : <span aria-current="page">{it.name}</span>}
            {i < all.length - 1 && <span>/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
