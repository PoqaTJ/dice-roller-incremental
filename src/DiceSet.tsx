import { Die } from './Die';

const diceTypes = [4, 6, 8, 10, 12, 20];

export function DiceSet() {
  return (
    <div className="flex flex-row gap-4 p-4 justify-center items-center">
      {diceTypes.map((sides) => (
        <Die key={sides} sides={sides} />
      ))}
    </div>
  );
}
