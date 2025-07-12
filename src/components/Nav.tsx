import Link from 'next/link';

export default function Nav({}) {
  return (
    <nav className="sticky top-0 flex gap-4 p-8">
      <Link href="/">Home</Link>
      <Link href="/coloursio">Colours.io</Link>
    </nav>
  );
}
