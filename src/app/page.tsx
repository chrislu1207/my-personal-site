import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-9rem)] sm:min-h-[calc(100vh-11rem)] flex items-center justify-center p-8 sm:p-20 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-start md:items-start sm:w-xl">
        <Image
          className="rounded-full border-[var(--foreground)] border-2"
          src="/me.jpeg"
          alt="Chris Lu"
          width={180}
          height={38}
          priority
        />
        <span className="text-2xl font-bold">Chris Lu</span>
        <p className="text-lg">
          Hey there! I am a frontend developer with a passion for building web
          applications. Welcome to my personal website where I share some of the
          projects I am currently working on.
        </p>
      </main>
    </div>
  );
}
