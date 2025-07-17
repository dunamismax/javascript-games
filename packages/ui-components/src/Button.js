export class Button extends Phaser.GameObjects.Container {
  constructor(scene, x, y, text, style = {}) {
    super(scene, x, y);
    
    this.scene = scene;
    this.defaultStyle = {
      fontSize: '24px',
      fontFamily: 'Arial',
      color: '#ffffff',
      backgroundColor: '#4a90e2',
      padding: { x: 20, y: 10 },
      borderRadius: 5,
      ...style
    };
    
    this.isPressed = false;
    this.isHovered = false;
    this.onClick = null;
    this.onHover = null;
    
    this.createButton(text);
    this.setupInteractions();
    
    scene.add.existing(this);
  }

  createButton(text) {
    const padding = this.defaultStyle.padding;
    const textStyle = {
      fontSize: this.defaultStyle.fontSize,
      fontFamily: this.defaultStyle.fontFamily,
      color: this.defaultStyle.color
    };
    
    this.buttonText = this.scene.add.text(0, 0, text, textStyle).setOrigin(0.5);
    
    const textBounds = this.buttonText.getBounds();
    const buttonWidth = textBounds.width + padding.x * 2;
    const buttonHeight = textBounds.height + padding.y * 2;
    
    this.background = this.scene.add.graphics();
    this.background.fillStyle(Phaser.Display.Color.HexStringToColor(this.defaultStyle.backgroundColor).color);
    this.background.fillRoundedRect(
      -buttonWidth / 2,
      -buttonHeight / 2,
      buttonWidth,
      buttonHeight,
      this.defaultStyle.borderRadius
    );
    
    this.add([this.background, this.buttonText]);
    
    this.buttonWidth = buttonWidth;
    this.buttonHeight = buttonHeight;
  }

  setupInteractions() {
    this.setSize(this.buttonWidth, this.buttonHeight);
    this.setInteractive({ useHandCursor: true });
    
    this.on('pointerdown', this.handlePointerDown, this);
    this.on('pointerup', this.handlePointerUp, this);
    this.on('pointerover', this.handlePointerOver, this);
    this.on('pointerout', this.handlePointerOut, this);
  }

  handlePointerDown() {
    this.isPressed = true;
    this.setScale(0.95);
    this.setAlpha(0.8);
  }

  handlePointerUp() {
    if (this.isPressed) {
      this.isPressed = false;
      this.setScale(1);
      this.setAlpha(1);
      
      if (this.onClick) {
        this.onClick();
      }
    }
  }

  handlePointerOver() {
    this.isHovered = true;
    this.setScale(1.05);
    
    if (this.onHover) {
      this.onHover(true);
    }
  }

  handlePointerOut() {
    this.isHovered = false;
    this.isPressed = false;
    this.setScale(1);
    this.setAlpha(1);
    
    if (this.onHover) {
      this.onHover(false);
    }
  }

  setText(text) {
    this.buttonText.setText(text);
  }

  setStyle(style) {
    Object.assign(this.defaultStyle, style);
    this.removeAll(true);
    this.createButton(this.buttonText.text);
  }

  setEnabled(enabled) {
    this.setInteractive(enabled);
    this.setAlpha(enabled ? 1 : 0.5);
  }

  setClickHandler(callback) {
    this.onClick = callback;
  }

  setHoverHandler(callback) {
    this.onHover = callback;
  }

  destroy() {
    this.removeAllListeners();
    super.destroy();
  }
}