import React, { useEffect, useState } from 'react';
import { Game } from '@numbers-go-up/game';
import './App.css';

const game = new Game();

const App: React.FC = () => {
  const [numsPerSecond, setNumsPerSecond] = useState(game.getNumsPerSecond());
  const [score, setScore] = useState(game.formatScore());

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
  }, []);

  return (
    <div>
      <div>Numbers go up</div>
      <div className="container">
        <div>
          <div> Score: {score} </div>
          <button className="clickButton" onClick={() => game.buttonClick()}>
            CLICK
          </button>
          <div> SPS: </div>
        </div>
      </div>
      <div className="upgrades">
        <button onClick={() => game.buyClickUpgrade()}>Upgrade Click </button>
        {' Cost '}
        {game.getClickUpgradeCost()}
        {' Value '}
        {game.getClickValue()}
        <button onClick={() => game.buyBoostUpgrade()}>Upgrade Boost </button>
        {' Cost '}
        {game.getBoostUpgradeCost()}
        {' Value '}
        {game.getBoostValue()}
      </div>
      <div>Numbers per second: {numsPerSecond.toFixed(1)}</div>
      <div>Score: {score}</div>
      <button onClick={() => game.boost()}>Moar Numbers</button>
      {/* <button onClick={() => game.buyUpgrade()}>Upgrade</button> */}
    </div>
  );
};

export default App;
