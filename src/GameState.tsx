import { createContext, useContext, useState, ReactNode } from 'react';

interface GameStateContextType {
  points: number;
  completionPoints: number;
  diceSetCount: number;
  addPoint: () => void;
  addCompletionPoint: () => void;
  purchaseDiceSet: () => boolean;
}

const GameStateContext = createContext<GameStateContextType | undefined>(undefined);

export function GameStateProvider({ children }: { children: ReactNode }) {
  const [points, setPoints] = useState(0);
  const [completionPoints, setCompletionPoints] = useState(0);
  const [diceSetCount, setDiceSetCount] = useState(1);

  const addPoint = () => setPoints(prev => prev + 1);
  const addCompletionPoint = () => setCompletionPoints(prev => prev + 1);
  
  const purchaseDiceSet = () => {
    const cost = Math.pow(2, diceSetCount - 1); // Cost starts at 1 and doubles each time
    if (points >= cost) {
      setPoints(prev => prev - cost);
      setDiceSetCount(prev => prev + 1);
      return true;
    }
    return false;
  };

  return (
    <GameStateContext.Provider value={{ 
      points, 
      completionPoints, 
      diceSetCount,
      addPoint, 
      addCompletionPoint,
      purchaseDiceSet
    }}>
      {children}
    </GameStateContext.Provider>
  );
}

export function useGameState() {
  const context = useContext(GameStateContext);
  if (context === undefined) {
    throw new Error('useGameState must be used within a GameStateProvider');
  }
  return context;
} 