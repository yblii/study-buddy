import dtl from '../../assets/ducks/duck_thinking.png';
import dtr from '../../assets/ducks/duck_thinking_right.png';
import dcl from '../../assets/ducks/duck_confused_left.png';
import dcr from '../../assets/ducks/duck_confused_right.png';

export function RandomDuck({ duckName }) {
    const ducks = [dtl, dtr, dcl, dcr];
    const randomDuck = ducks[Math.floor(Math.random() * ducks.length)];

    return (
    <div className="flex flex-col items-center justify-center gap-4 h-full">
      <div className="relative w-5/6 max-w-sm aspect-square flex justify-center items-center">
        <img
          src={randomDuck}
          alt="Random Duck"
          className="object-contain w-full max-h-full"
        />
      </div>
      {duckName && (
      <p className="mt-2 text-lg font-semibold text-gray-800 p-4 rounded-lg bg-white">
       {duckName}
      </p>
    )}
    </div>
  );
}