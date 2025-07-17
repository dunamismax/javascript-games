export class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOverScene' });
  }

  init(data) {
    this.finalScore = data.score;
  }

  create() {
    this.add
      .text(320, 150, 'GAME OVER', {
        fontSize: '48px',
        fontFamily: 'Arial',
        color: '#ff5252',
      })
      .setOrigin(0.5);

    this.add
      .text(320, 220, `Final Score: ${this.finalScore}`, {
        fontSize: '24px',
        fontFamily: 'Arial',
        color: '#ffffff',
      })
      .setOrigin(0.5);

    this.add
      .text(320, 260, this.getScoreMessage(), {
        fontSize: '18px',
        fontFamily: 'Arial',
        color: '#7cb342',
      })
      .setOrigin(0.5);

    const playAgainButton = this.add
      .text(320, 350, 'PLAY AGAIN', {
        fontSize: '24px',
        fontFamily: 'Arial',
        color: '#ffffff',
        backgroundColor: '#7cb342',
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
      .text(320, 420, 'MAIN MENU', {
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

    this.createBorderPattern();
  }

  getScoreMessage() {
    if (this.finalScore >= 500) {
      return 'Amazing! Snake Master!';
    } else if (this.finalScore >= 300) {
      return 'Great job! Keep growing!';
    } else if (this.finalScore >= 150) {
      return 'Good effort! Try again!';
    } else if (this.finalScore >= 50) {
      return 'Not bad! Practice makes perfect!';
    } else {
      return "Keep trying! You'll get better!";
    }
  }

  createBorderPattern() {
    const borderColor = 0x4a7c23;

    for (let i = 0; i < 640; i += 20) {
      if (i % 40 === 0) {
        this.add.rectangle(i + 10, 10, 20, 20, borderColor);
        this.add.rectangle(i + 10, 630, 20, 20, borderColor);
      }
    }

    for (let i = 0; i < 640; i += 20) {
      if (i % 40 === 0) {
        this.add.rectangle(10, i + 10, 20, 20, borderColor);
        this.add.rectangle(630, i + 10, 20, 20, borderColor);
      }
    }
  }
}
