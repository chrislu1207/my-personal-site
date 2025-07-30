'use client';

import { adjustRGBColor, getRandomRGBColor } from '@/utils/utils';
import { useCallback, useEffect, useState } from 'react';

const DifficultyConfig: Record<
  number,
  { title: string; size: number; colorAdjustment: number; gridSize: string }
> = {
  3: { title: '1', size: 3, colorAdjustment: 14, gridSize: 'grid-cols-3' },
  4: { title: '2', size: 4, colorAdjustment: 12, gridSize: 'grid-cols-4' },
  5: { title: '3', size: 5, colorAdjustment: 10, gridSize: 'grid-cols-5' },
  6: {
    title: '4',
    size: 6,
    colorAdjustment: 10,
    gridSize: 'grid-cols-6',
  },
  7: {
    title: '5',
    size: 7,
    colorAdjustment: 10,
    gridSize: 'grid-cols-7',
  },
};

export default function Coloursio() {
  const [difficulty, setDifficulty] = useState<number>(3);
  const [gridItems, setGridItems] = useState<number[]>([]);
  const [answer, setAnswer] = useState<number>(0);
  const [color, setColor] = useState<string>('rgb(0, 0, 0)');
  const [wins, setWins] = useState<number>(0);

  const resetGame = useCallback(() => {
    setDifficulty(difficulty);
    setColor(getRandomRGBColor());
    setAnswer(Math.floor(Math.random() * (difficulty * difficulty)));
    setGridItems(Array.from({ length: difficulty * difficulty }, (_, i) => i));
  }, [difficulty]);

  useEffect(() => {
    resetGame();
  }, [difficulty, resetGame]);

  const handleItemClick = (item: number) => {
    if (item === answer) {
      setWins(wins + 1);
      resetGame();
    } else {
      setWins(0);
      resetGame();
    }
  };

  return (
    <div className="items-center justify-items-center p-8">
      <main className="flex flex-col gap-[32px] items-center sm:items-start">
        <h1 className="text-2xl font-bold">Colours.io</h1>
        <span className="text-lg">
          Guess the square that has a different colour than the rest. Try to get
          as many correct guesses in a row as possible!
        </span>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <span className="mr-2">Select Difficulty:</span>
          <div className="flex flex-row gap-4">
            {Object.entries(DifficultyConfig).map(([key, config]) => (
              <button
                key={key}
                className="size-12 rounded-full p-3 border border-[var(--foreground)] hover:border-fuchsia-500 disabled:border-fuchsia-500 disabled:cursor-not-allowed hover:cursor-pointer"
                disabled={difficulty === config.size}
                onClick={() => {
                  setWins(0);
                  setDifficulty(config.size);
                }}
              >
                {config.title}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-items-center text-center">
          <div className="mr-2">Score:</div>
          <div className="font-bold text-3xl">{wins}</div>
        </div>
        <div
          className={`size-80 grid ${DifficultyConfig[difficulty].gridSize} gap-1 sm:size-120 sm:gap-2`}
        >
          {gridItems.map((item) => (
            <div
              className="hover:cursor-pointer hover:ring-2 ring-[var(--foreground)] ring-inset hover:border-[var(--foreground)]"
              key={item}
              onClick={() => handleItemClick(item)}
              style={{
                backgroundColor:
                  item === answer
                    ? adjustRGBColor(
                        color,
                        DifficultyConfig[difficulty].colorAdjustment
                      )
                    : color,
              }}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
