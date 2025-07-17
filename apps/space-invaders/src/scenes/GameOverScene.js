export class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOverScene' });
  }

  init(data) {
    this.finalScore = data.score;
    this.finalLevel = data.level;
  }

  create() {
    this.createStars();

    this.add
      .text(400, 150, 'GAME OVER', {
        fontSize: '48px',
        fontFamily: 'Arial',
        color: '#ff0000',
      })
      .setOrigin(0.5);

    this.add
      .text(400, 220, `Final Score: ${this.finalScore}`, {
        fontSize: '24px',
        fontFamily: 'Arial',
        color: '#ffffff',
      })
      .setOrigin(0.5);

    this.add
      .text(400, 260, `Level Reached: ${this.finalLevel}`, {
        fontSize: '24px',
        fontFamily: 'Arial',
        color: '#ffffff',
      })
      .setOrigin(0.5);

    const playAgainButton = this.add
      .text(400, 350, 'PLAY AGAIN', {
        fontSize: '24px',
        fontFamily: 'Arial',
        color: '#ffffff',
        backgroundColor: '#00aa00',
        padding: { x: 20, y: 10 },
      })
      .setOrigin(0.5);

    playAgainButton.setInteractive({ useHandCursor: true });
    playAgainButton.on('pointerdown', () => {
      this.scene.start('GameScene');
    });

    playAgainButton.on('pointerover', () => {
      playAgainButton.setScale(1.1);
    });

    playAgainButton.on('pointerout', () => {
      playAgainButton.setScale(1);
    });

    const menuButton = this.add
      .text(400, 420, 'MAIN MENU', {
        fontSize: '24px',
        fontFamily: 'Arial',
        color: '#ffffff',
        backgroundColor: '#666666',
        padding: { x: 20, y: 10 },
      })
      .setOrigin(0.5);

    menuButton.setInteractive({ useHandCursor: true });
    menuButton.on('pointerdown', () => {
      this.scene.start('MenuScene');
    });

    menuButton.on('pointerover', () => {
      menuButton.setScale(1.1);
    });

    menuButton.on('pointerout', () => {
      menuButton.setScale(1);
    });
  }

  createStars() {
    for (let i = 0; i < 50; i++) {
      const star = this.add.circle(
        Phaser.Math.Between(0, 800),
        Phaser.Math.Between(0, 600),
        Phaser.Math.Between(1, 3),
        0xffffff,
        Phaser.Math.FloatBetween(0.3, 1)
      );

      this.tweens.add({
        targets: star,
        alpha: 0.3,
        duration: Phaser.Math.Between(1000, 3000),
        yoyo: true,
        repeat: -1,
      });
    }
  }
}
