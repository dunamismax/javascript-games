export class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  create() {
    this.add
      .text(320, 150, 'SNAKE', {
        fontSize: '64px',
        fontFamily: 'Arial',
        color: '#7cb342',
      })
      .setOrigin(0.5);

    this.add
      .text(320, 220, 'Eat the food, grow longer!', {
        fontSize: '20px',
        fontFamily: 'Arial',
        color: '#ffffff',
      })
      .setOrigin(0.5);

    this.add
      .text(320, 250, "Don't hit the walls or yourself!", {
        fontSize: '20px',
        fontFamily: 'Arial',
        color: '#ffffff',
      })
      .setOrigin(0.5);

    const playButton = this.add
      .text(320, 350, 'START GAME', {
        fontSize: '24px',
        fontFamily: 'Arial',
        color: '#ffffff',
        backgroundColor: '#7cb342',
        padding: { x: 20, y: 10 },
      })
      .setOrigin(0.5);

    playButton.setInteractive({ useHandCursor: true });
    playButton.on('pointerdown', () => {
      this.scene.start('GameScene');
    });

    playButton.on('pointerover', () => {
      playButton.setScale(1.1);
    });

    playButton.on('pointerout', () => {
      playButton.setScale(1);
    });

    this.add
      .text(320, 450, 'Controls:', {
        fontSize: '18px',
        fontFamily: 'Arial',
        color: '#ffffff',
      })
      .setOrigin(0.5);

    this.add
      .text(320, 480, 'Arrow Keys or WASD to move', {
        fontSize: '14px',
        fontFamily: 'Arial',
        color: '#cccccc',
      })
      .setOrigin(0.5);

    this.add
      .text(320, 500, 'P to pause', {
        fontSize: '14px',
        fontFamily: 'Arial',
        color: '#cccccc',
      })
      .setOrigin(0.5);

    this.add
      .text(320, 520, 'R to restart', {
        fontSize: '14px',
        fontFamily: 'Arial',
        color: '#cccccc',
      })
      .setOrigin(0.5);

    this.createBorderPattern();
  }

  createBorderPattern() {
    const borderColor = 0x4a7c23;
    const borderWidth = 4;

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
