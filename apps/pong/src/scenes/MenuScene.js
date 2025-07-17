export class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  preload() {
    this.load.on('complete', () => {
      this.createMenu();
    });
  }

  create() {
    this.add.text(400, 150, 'PONG', {
      fontSize: '64px',
      fontFamily: 'Arial',
      color: '#ffffff'
    }).setOrigin(0.5);

    this.add.text(400, 250, 'Classic Pong Game', {
      fontSize: '24px',
      fontFamily: 'Arial',
      color: '#cccccc'
    }).setOrigin(0.5);

    this.createMenu();
  }

  createMenu() {
    const playButton = this.add.text(400, 350, 'Play', {
      fontSize: '32px',
      fontFamily: 'Arial',
      color: '#ffffff',
      backgroundColor: '#4a90e2',
      padding: { x: 20, y: 10 }
    }).setOrigin(0.5);

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

    this.add.text(400, 450, 'Controls:', {
      fontSize: '20px',
      fontFamily: 'Arial',
      color: '#ffffff'
    }).setOrigin(0.5);

    this.add.text(400, 480, 'Player 1: W/S keys', {
      fontSize: '16px',
      fontFamily: 'Arial',
      color: '#cccccc'
    }).setOrigin(0.5);

    this.add.text(400, 500, 'Player 2: UP/DOWN arrows', {
      fontSize: '16px',
      fontFamily: 'Arial',
      color: '#cccccc'
    }).setOrigin(0.5);

    this.add.text(400, 530, 'Press SPACE to pause', {
      fontSize: '16px',
      fontFamily: 'Arial',
      color: '#cccccc'
    }).setOrigin(0.5);
  }
}