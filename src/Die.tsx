import { useState } from 'react';

type DieProps = {
  sides: number;
  color?: string; // Tailwind color string like "red-500", "blue-600"
};

function getColorFilter(color: string): string {
  switch (color) {
    case 'red': return 'brightness(100%) saturate(100%) sepia(100%) hue-rotate(-10deg) saturate(600%)';
    case 'blue': return 'brightness(0) saturate(100%) sepia(100%) hue-rotate(190deg) saturate(600%)';
    case 'green': return 'brightness(0) saturate(100%) sepia(100%) hue-rotate(100deg) saturate(600%)';
    case 'purple': return 'brightness(0) saturate(100%) sepia(100%) hue-rotate(280deg) saturate(600%)';
    case 'gray':
    default: return 'brightness(0) invert(0%)'; // neutral gray
  }
}

export function Die({ sides, color = 'red' }: DieProps) {
  const [face, setFace] = useState(1);
  const [rolling, setRolling] = useState(false);

  const imagePath = `/assets/dice/base/d${sides}.png`;

  function rollDie() {
    if (rolling) return;
    setRolling(true);

    let counter = 0;
    const interval = setInterval(() => {
      setFace(Math.floor(Math.random() * sides) + 1);
      counter++;
      if (counter > 10) {
        clearInterval(interval);
        setRolling(false);
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
        style={{ 
          backgroundImage: `url("${imagePath}")`,
          filter: getColorFilter(color)
        }}
        />

        {/* Color the die image */}
        <div className={`absolute inset-0 mix-blend-multiply pointer-events-none`} />


        {/* Number overlay */}
        <div className="absolute inset-0 flex items-center justify-center text-black text-3xl font-bold">
        {face}
        </div>
      </div>
    </div>
  );
}
