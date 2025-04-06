import { createContext, useContext, useState, ReactNode } from 'react';

interface GameStateContextType {
  points: number;
  completionPoints: number;
  addPoint: () => void;
  addCompletionPoint: () => void;
}

const GameStateContext = createContext<GameStateContextType | undefined>(undefined);

export function GameStateProvider({ children }: { children: ReactNode }) {
  const [points, setPoints] = useState(0);
  const [completionPoints, setCompletionPoints] = useState(0);

  const addPoint = () => setPoints(prev => prev + 1);
  const addCompletionPoint = () => setCompletionPoints(prev => prev + 1);

  return (
    <GameStateContext.Provider value={{ points, completionPoints, addPoint, addCompletionPoint }}>
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