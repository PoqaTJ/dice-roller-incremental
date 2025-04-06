import './App.css'
import { DiceSet } from './DiceSet';
import { GameStateProvider, useGameState } from './GameState';

function Header() {
  const { points, completionPoints, diceSetCount, minimizeDiceSets, setMinimizeDiceSets } = useGameState();
  
  return (
    <div className="w-full bg-gray-800 p-4 flex justify-between items-center">
      <div className="flex gap-6 text-white">
        <div className="text-xl">Points: {points}</div>
        <div className="text-xl">Completion Points: {completionPoints}</div>
      </div>
      <div className="flex items-center gap-6 text-white">
        <div className="text-xl">
          Dice Sets: {diceSetCount}
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={minimizeDiceSets}
            onChange={(e) => setMinimizeDiceSets(e.target.checked)}
            className="w-4 h-4"
          />
          <span className="text-xl">Compact View</span>
        </label>
      </div>
    </div>
  );
}

function DiceSetsContainer() {
  const { diceSetCount, points, purchaseDiceSet, minimizeDiceSets } = useGameState();
  const nextSetCost = Math.pow(2, diceSetCount - 1);
  const canAfford = points >= nextSetCost;
  
  return (
    <div className="overflow-y-auto max-h-[calc(100vh-4rem)] w-full p-4">
      <div className={`${minimizeDiceSets ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4' : 'flex flex-col items-center gap-4'}`}>
        {Array.from({ length: diceSetCount }).map((_, index) => (
          <div key={index} className="bg-gray-700 rounded-lg p-2 shadow-lg">
            <DiceSet />
          </div>
        ))}
      </div>
      
      <button 
        className={`font-bold py-2 px-4 rounded mt-4 ${
          canAfford 
            ? 'bg-gray-600 text-black cursor-pointer border-2 border-black' 
            : 'bg-gray-200 text-gray-400 border-2 border-gray-400'
        }`}
        onClick={purchaseDiceSet}
        disabled={!canAfford}
      >
        Buy Dice Set ({nextSetCost} points)
      </button>
    </div>
  );
}

function App() {
  return (
    <GameStateProvider>
      <div className="flex flex-col bg-gray-500 min-h-screen text-3xl font-bold text-white-100">
        <Header />
        <DiceSetsContainer />
      </div>
    </GameStateProvider>
  );
}

export default App