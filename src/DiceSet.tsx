import { useState, useEffect } from 'react';
import { Die } from './Die';
import { GameConfig } from './Game';
import { useGameState } from './GameState';

const diceTypes = [4, 6, 8, 10, 12, 20];

export function DiceSet() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const { addPoint, addCompletionPoint } = useGameState();

  function onReset() {
    setActiveIndex(0);
    setIsCompleted(false);
  }

  function onSetCompleted() {
    addCompletionPoint();
    setIsCompleted(true);
    setTimeout(() => {
      onReset();
    }, GameConfig.SET_RESET_DELAY_SECONDS * 1000);
  }

  function handleRoll(index: number, result: number, sides: number) {
    if (result != sides) {
      return;
    }

    addPoint();
    
    setActiveIndex(index + 1);
    if (index === diceTypes.length - 1) {
      onSetCompleted();
    }
  }

  return (
    <div className="flex flex-row gap-4 p-4 justify-center items-center">
      {diceTypes.map((sides, index) => {
        const isUnlocked = index <= activeIndex;
        const isActive = index === activeIndex;

        return (
          <div
            key={sides}
            className={`transition-opacity duration-300 ${
              isUnlocked ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ width: '5rem', height: '5rem' }}
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
