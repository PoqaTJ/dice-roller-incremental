import './App.css'
import { DiceSet } from './DiceSet';
import { GameStateProvider, useGameState } from './GameState';

function CurrencyDisplay() {
  const { points, completionPoints } = useGameState();
  
  return (
    <div className="absolute top-4 left-4 flex flex-col gap-2 text-white">
      <div className="text-xl">Points: {points}</div>
      <div className="text-xl">Completion Points: {completionPoints}</div>
    </div>
  );
}

function App() {
  return (
    <GameStateProvider>
      <div className="flex items-center justify-center bg-gray-500 h-screen text-3xl font-bold text-white-100 relative">
        <CurrencyDisplay />
        <DiceSet />
      </div>
    </GameStateProvider>
  );
}

export default App