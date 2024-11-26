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
  private lastScore = 0; // Last recorded score
  private lastUpdateTime = 0; // Time of the last update
  private scorePerSecond = 0; // Variable to store the calculated score per second


  constructor() {
    super();

    Mainloop.setUpdate((delta) => {

      // update score
      const deltaScore = (delta * this.numsPerSecond * this.gameSpeed) / 1000;
      this.updateScore.call(this, deltaScore);

    });
  }

  public updateScore(deltaIncrement) {
    const currentTime = performance.now();
  
    // If this is the first update, initialize the timing system
    if (this.lastUpdateTime === 0) {
      this.lastUpdateTime = currentTime;
    }
  
    // Update the score with the provided increment
    this.score += deltaIncrement;
  
    // Calculate time elapsed in seconds since the last update
    const timeElapsed = (currentTime - this.lastUpdateTime) / 1000; // Convert ms to seconds
  
    if (timeElapsed > 0) {
      // Calculate the score change
      const scoreChange = this.score - this.lastScore;
  
      // Calculate score per second
      this.scorePerSecond = scoreChange / timeElapsed;
  
      // Update last recorded score and time
      this.lastScore = this.score;
      this.lastUpdateTime = currentTime;
  
       // emit scoreUpdate if it changed
       const newRoundedScore = this.formatScore();
       if (newRoundedScore !== this.roundedScore) {
         this.roundedScore = newRoundedScore;
         this.emit('scoreUpdate', this.roundedScore);
         this.emit('scorePerSecondUpdate', this.formatScorePerSecond());
       }

    }
  }

  public start() {
    Mainloop.start();
  }

  public stop() {
    Mainloop.stop();
  }

  public formatScore() {
    return this.score.toFixed(0);
  }

  public formatScorePerSecond() {
    return this.scorePerSecond.toFixed(0);
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

  public getScorePerSecond() {
    return this.scorePerSecond
  }
}

export default Game;
