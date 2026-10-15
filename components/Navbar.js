import Link from 'next/link';
import SearchBox from './SearchBox';
import ThemeToggle from './ThemeToggle';

const links = [
  ['/categories', 'Categories'], ['/latest', 'Latest'], ['/trending', 'Trending'], ['/popular', 'Popular'],
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-red-100 bg-white/90 backdrop-blur dark:border-red-950 dark:bg-neutral-950/90">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3">
        <Link href="/" className="text-xl font-extrabold text-brand">Insta<span className="text-gray-900 dark:text-white">graim</span></Link>
        <nav className="hidden gap-4 text-sm font-medium md:flex" aria-label="Main">
          {links.map(([href, label]) => (
            <Link key={href} href={href} className="hover:text-brand">{label}</Link>
          ))}
        </nav>
        <SearchBox className="order-last w-full md:order-none md:ml-auto md:w-80" />
        <ThemeToggle />
      </div>
      <nav className="flex gap-4 overflow-x-auto px-4 pb-2 text-sm md:hidden" aria-label="Mobile">
        {links.map(([href, label]) => (
          <Link key={href} href={href} className="whitespace-nowrap hover:text-brand">{label}</Link>
        ))}
      </nav>
    </header>
  );
}
