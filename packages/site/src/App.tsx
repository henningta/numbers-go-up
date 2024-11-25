import React, { useEffect, useState } from 'react';
import { Game } from '@numbers-go-up/game';

const game = new Game();

const App: React.FC = () => {
  const [numsPerSecond, setNumsPerSecond] = useState(0);
  const [score, setScore] = useState('0');

  useEffect(() => {
    game.start();

    const updateScore = (score: string) => setScore(score);
    const updateNps = (nps: number) => setNumsPerSecond(nps);

    game.on('scoreUpdate', updateScore);
    game.on('boost', updateNps);

    return () => {
      game.off('scoreUpdate', updateScore);
      game.off('boost', updateNps);
      game.stop();
    };
  });

  return (
    <div>
      <div>Numbers go up</div>
      <div>Numbers per second: {numsPerSecond.toFixed(1)}</div>
      <div>Score: {score}</div>
      <button onClick={() => game.boost()}>Moar Numbers</button>
    </div>
  );
};

export default App;
