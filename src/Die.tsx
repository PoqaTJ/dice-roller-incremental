import { useState } from 'react';

type DieProps = {
  sides: number;
  onRoll?: (value: number) => void;
  disabled?: boolean;
};

export function Die({ sides, onRoll, disabled }: DieProps) {
  const [face, setFace] = useState(1);
  const [rolling, setRolling] = useState(false);

  const imagePath = `/assets/dice/base/d${sides}.png`;

  function rollDie() {
    if (rolling || disabled) return;
    setRolling(true);

    let counter = 0;
    const interval = setInterval(() => {
      const result = Math.floor(Math.random() * sides) + 1;
      setFace(result);
      counter++;
      if (counter > 10) {
        clearInterval(interval);
        setRolling(false);
        onRoll?.(result);
      }
    }, 50);
  }

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative w-24 h-24 cursor-pointer"
        onClick={rollDie}
      >
        {/* Die image */}
        <div
        className="absolute inset-0 bg-center bg-cover"
        style={{ backgroundImage: `url("${imagePath}")` }}
        />

        {/* Number overlay */}
        <div className="absolute inset-0 flex items-center justify-center text-black text-3xl font-bold">
        {face}
        </div>
      </div>
    </div>
  );
}
