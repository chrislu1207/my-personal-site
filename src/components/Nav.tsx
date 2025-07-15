import Link from 'next/link';

export default function Nav() {
  return (
    <nav className="sticky top-0 flex gap-4 p-6 sm:p-8">
      <Link className="hover:underline hover:underline-offset-4" href="/">
        Home
      </Link>
      <Link
        className="hover:underline hover:underline-offset-4"
        href="/coloursio"
      >
        Colours.io
      </Link>
      <Link
        className="hover:underline hover:underline-offset-4"
        href="/cardify"
      >
        Cardify
      </Link>
    </nav>
  );
}
