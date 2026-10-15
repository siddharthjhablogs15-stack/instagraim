import Link from 'next/link';

const links = [['/about', 'About'], ['/privacy', 'Privacy Policy'], ['/terms', 'Terms'], ['/dmca', 'DMCA'], ['/contact', 'Contact'], ['/sitemap.xml', 'Sitemap']];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-red-100 bg-brand-soft py-8 dark:border-red-950 dark:bg-neutral-900">
      <div className="mx-auto max-w-7xl px-4 text-sm">
        <nav className="flex flex-wrap gap-4" aria-label="Footer">
          {links.map(([href, label]) => <Link key={href} href={href} className="hover:text-brand">{label}</Link>)}
        </nav>
        <p className="mt-4 text-gray-600 dark:text-gray-400">© {new Date().getFullYear()} Instagraim.in – Saree fashion images & HD wallpapers. All rights reserved.</p>
      </div>
    </footer>
  );
}
