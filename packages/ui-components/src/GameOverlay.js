export class GameOverlay extends Phaser.GameObjects.Container {
  constructor(scene, x, y, options = {}) {
    super(scene, x, y);
    
    this.scene = scene;
    this.options = {
      width: scene.cameras.main.width,
      height: scene.cameras.main.height,
      backgroundColor: '#000000',
      backgroundAlpha: 0.8,
      titleStyle: {
        fontSize: '48px',
        fontFamily: 'Arial',
        color: '#ffffff'
      },
      messageStyle: {
        fontSize: '24px',
        fontFamily: 'Arial',
        color: '#ffffff'
      },
      buttonStyle: {
        fontSize: '20px',
        fontFamily: 'Arial',
        color: '#ffffff',
        backgroundColor: '#4a90e2',
        padding: { x: 20, y: 10 },
        borderRadius: 5
      },
      ...options
    };
    
    this.isVisible = false;
    this.overlay = null;
    this.title = null;
    this.message = null;
    this.buttons = [];
    
    this.createOverlay();
    
    scene.add.existing(this);
  }

  createOverlay() {
    this.overlay = this.scene.add.graphics();
    this.overlay.fillStyle(
      Phaser.Display.Color.HexStringToColor(this.options.backgroundColor).color,
      this.options.backgroundAlpha
    );
    this.overlay.fillRect(
      -this.options.width / 2,
      -this.options.height / 2,
      this.options.width,
      this.options.height
    );
    
    this.add(this.overlay);
    this.setVisible(false);
  }

  showGameOver(score = null, callback = null) {
    this.clear();
    
    this.title = this.scene.add.text(0, -100, 'Game Over', this.options.titleStyle);
    this.title.setOrigin(0.5);
    this.add(this.title);
    
    if (score !== null) {
      this.message = this.scene.add.text(0, -40, `Final Score: ${score}`, this.options.messageStyle);
      this.message.setOrigin(0.5);
      this.add(this.message);
    }
    
    if (callback) {
      const restartButton = this.scene.add.text(0, 40, 'Play Again', this.options.buttonStyle);
      restartButton.setOrigin(0.5);
      restartButton.setInteractive({ useHandCursor: true });
      restartButton.on('pointerdown', () => {
        this.hide();
        callback();
      });
      this.add(restartButton);
    }
    
    this.show();
  }

  showPause(resumeCallback = null) {
    this.clear();
    
    this.title = this.scene.add.text(0, -50, 'Paused', this.options.titleStyle);
    this.title.setOrigin(0.5);
    this.add(this.title);
    
    if (resumeCallback) {
      const resumeButton = this.scene.add.text(0, 40, 'Resume', this.options.buttonStyle);
      resumeButton.setOrigin(0.5);
      resumeButton.setInteractive({ useHandCursor: true });
      resumeButton.on('pointerdown', () => {
        this.hide();
        resumeCallback();
      });
      this.add(resumeButton);
    }
    
    this.show();
  }

  showMessage(title, message = null, buttons = []) {
    this.clear();
    
    this.title = this.scene.add.text(0, -50, title, this.options.titleStyle);
    this.title.setOrigin(0.5);
    this.add(this.title);
    
    if (message) {
      this.message = this.scene.add.text(0, 0, message, this.options.messageStyle);
      this.message.setOrigin(0.5);
      this.add(this.message);
    }
    
    buttons.forEach((button, index) => {
      const buttonY = 60 + (index * 50);
      const buttonText = this.scene.add.text(0, buttonY, button.text, this.options.buttonStyle);
      buttonText.setOrigin(0.5);
      buttonText.setInteractive({ useHandCursor: true });
      buttonText.on('pointerdown', () => {
        this.hide();
        if (button.callback) button.callback();
      });
      this.add(buttonText);
      this.buttons.push(buttonText);
    });
    
    this.show();
  }

  clear() {
    this.removeAll(true);
    this.createOverlay();
    this.title = null;
    this.message = null;
    this.buttons = [];
  }

  show() {
    this.setVisible(true);
    this.isVisible = true;
    this.setDepth(1000);
  }

  hide() {
    this.setVisible(false);
    this.isVisible = false;
  }

  fadeIn(duration = 500) {
    this.setAlpha(0);
    this.show();
    
    this.scene.tweens.add({
      targets: this,
      alpha: 1,
      duration: duration,
      ease: 'Power2'
    });
  }

  fadeOut(duration = 500, callback = null) {
    this.scene.tweens.add({
      targets: this,
      alpha: 0,
      duration: duration,
      ease: 'Power2',
      onComplete: () => {
        this.hide();
        if (callback) callback();
      }
    });
  }

  destroy() {
    this.buttons.forEach(button => button.destroy());
    this.buttons = [];
    super.destroy();
  }
}