import Mainloop from 'mainloop.js';
import { EventEmitter } from 'events';

class Game extends EventEmitter {
  private numsPerSecond = 1;
  private precision = 0;
  private roundedScore = '0';
  private score = 0;
  private clickUpgradeCost = 1;
  private boostUpgradeCost = 1;
  private gameSpeed = 1;
  private clickValue = 1;


  constructor() {
    super();

    Mainloop.setUpdate((delta) => {
      // update score
      this.score += (delta * this.numsPerSecond * this.gameSpeed) / 1000;

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
    this.numsPerSecond += 1;
    this.emit('boost', this.numsPerSecond);
  }     

  public buyClickUpgrade() {
    if (this.score-this.clickUpgradeCost>0){
      this.score -= this.clickUpgradeCost; 
      this.clickUpgradeCost = this.clickUpgradeCost*2
      this.clickValue += 1;
    } 
  }

  public buyBoostUpgrade() {
    if (this.score-this.boostUpgradeCost>0){
      this.score -= this.boostUpgradeCost; 
      this.boostUpgradeCost = this.boostUpgradeCost*2
      this.boost()
    } 
  }

  public buttonClick() {
    this.score += this.clickValue;

  }

  public getClickUpgradeCost() {
    return this.clickUpgradeCost;
  }

  public getClickValue() {
    return this.clickValue;
  }

  public getBoostUpgradeCost() {
    return this.boostUpgradeCost;
  }

  public getBoostValue() {
    return this.numsPerSecond;
  }
}

export default Game;
