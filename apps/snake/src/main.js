import { MenuScene } from './scenes/MenuScene.js';
import { GameScene } from './scenes/GameScene.js';
import { GameOverScene } from './scenes/GameOverScene.js';

const config = {
  type: Phaser.AUTO,
  width: 640,
  height: 640,
  parent: 'game-container',
  backgroundColor: '#2d5016',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: [MenuScene, GameScene, GameOverScene]
};

const game = new Phaser.Game(config);

document.getElementById('loading').style.display = 'none';