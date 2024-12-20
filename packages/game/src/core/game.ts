import Mainloop from 'mainloop.js';
import { EventEmitter } from 'events';

class Game extends EventEmitter {
  private numsPerSecond = 1;
  private precision = 0;
  private roundedScore = '0';
  private score = 0;

  constructor() {
    super();

    Mainloop.setUpdate((delta) => {
      // update score
      this.score += (delta * this.numsPerSecond) / 1000;

      // emit scoreUpdate if it changed
      const newRoundedScore = this.formatScore();
      if (newRoundedScore !== this.roundedScore) {
        this.roundedScore = newRoundedScore;
        this.emit('scoreUpdate', this.roundedScore);
      }
    });
  }

  public start() {
    Mainloop.start();
  }

  public stop() {
    Mainloop.stop();
  }

  public formatScore() {
    return this.score.toFixed(this.precision);
  }

  public getNumsPerSecond() {
    return this.numsPerSecond;
  }

  public boost() {
    this.numsPerSecond += 0.1;
    this.emit('boost', this.numsPerSecond);
  }
}

export default Game;
