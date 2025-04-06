import { useState } from 'react';
import { Game } from './Game';

type DieProps = {
  sides: number;
  onRoll?: (value: number) => void;
  disabled?: boolean;
};

export function Die({ sides, onRoll, disabled }: DieProps) {
  const [face, setFace] = useState(1);
  const [rolling, setRolling] = useState(false);

  const imagePath = `${import.meta.env.BASE_URL}assets/dice/base/d${sides}.png`;

  function rollDuration(): number{
    return Game.ROLL_DURATION_SECONDS;
  }

  function rollDie() {
    if (rolling || disabled) return;
    setRolling(true);

    const rollDur = rollDuration();
    const interval = setInterval(() => {
      const result = Math.floor(Math.random() * sides) + 1;
      setFace(result);
    }, 50);

    setTimeout(() => {
      clearInterval(interval);
      const finalResult = Math.floor(Math.random() * sides) + 1;
      setFace(finalResult);
      setRolling(false);
      onRoll?.(finalResult);
    }, rollDur * 1000);
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
        <div className="absolute inset-0 flex items-center justify-center text-black text-3xl font-bold select-none">
        {face}
        </div>
      </div>
    </div>
  );
}
