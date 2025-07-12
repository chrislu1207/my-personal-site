import Footer from '@/components/Footer';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="rounded-full border-white border-2"
          src="/me.jpeg"
          alt="Chris Lu"
          width={180}
          height={38}
          priority
        />
        <span className="text-2xl font-bold">Chris Lu</span>
        <p className="text-lg w-xl">
          I am a software engineer with a passion for building web applications.
          This is my personal site where I share my projects and thoughts.
        </p>
      </main>
      <Footer />
    </div>
  );
}
