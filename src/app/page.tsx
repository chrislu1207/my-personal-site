import Image from 'next/image';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-start md:items-start sm:w-xl">
        <Image
          className="rounded-full border-white border-2"
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
