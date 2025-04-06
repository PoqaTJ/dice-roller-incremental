import { useState, useEffect } from 'react';
import { Die } from './Die';
import { GameConfig } from './Game';

const diceTypes = [4, 6, 8, 10, 12, 20];

export function DiceSet() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [completed, setCompleted] = useState<boolean[]>(Array(diceTypes.length).fill(false));

  // Reset the set when all dice are completed
  useEffect(() => {
    if (completed.every(isComplete => isComplete)) {
      const resetTimer = setTimeout(() => {
        setActiveIndex(0);
        setCompleted(Array(diceTypes.length).fill(false));
      }, GameConfig.SET_RESET_DELAY_SECONDS * 1000);

      return () => clearTimeout(resetTimer);
    }
  }, [completed]);

  function handleRoll(index: number, result: number, sides: number) {
    if (result === sides && index === activeIndex) {
      setCompleted((prev) => {
        const updated = [...prev];
        updated[index] = true;
        return updated;
      });

      if (activeIndex < diceTypes.length - 1) {
        setActiveIndex(index + 1);
      }
    }
  }

  return (
    <div className="flex flex-row gap-4 p-4 justify-center items-center">
      {diceTypes.map((sides, index) => {
        const isUnlocked = index <= activeIndex;
        const isActive = index === activeIndex;
        const isCompleted = completed[index];

        return (
          <div
            key={sides}
            className={`transition-opacity duration-300 ${
              isUnlocked ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ width: '6rem', height: '6rem' }}
          >
            {isUnlocked && (
              <Die
                sides={sides}
                onRoll={(value) => handleRoll(index, value, sides)}
                disabled={!isActive || isCompleted}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
