import { Button } from './Button.js';

export class Menu extends Phaser.GameObjects.Container {
  constructor(scene, x, y, options = {}) {
    super(scene, x, y);
    
    this.scene = scene;
    this.options = {
      title: 'Menu',
      titleStyle: {
        fontSize: '48px',
        fontFamily: 'Arial',
        color: '#ffffff'
      },
      buttonStyle: {
        fontSize: '24px',
        fontFamily: 'Arial',
        color: '#ffffff',
        backgroundColor: '#4a90e2',
        padding: { x: 20, y: 10 },
        borderRadius: 5
      },
      spacing: 60,
      ...options
    };
    
    this.buttons = [];
    this.title = null;
    
    this.createMenu();
    
    scene.add.existing(this);
  }

  createMenu() {
    if (this.options.title) {
      this.title = this.scene.add.text(0, 0, this.options.title, this.options.titleStyle);
      this.title.setOrigin(0.5);
      this.add(this.title);
    }
  }

  addButton(text, callback) {
    const buttonY = this.title ? this.title.y + 100 + (this.buttons.length * this.options.spacing) : this.buttons.length * this.options.spacing;
    
    const button = new Button(this.scene, 0, buttonY, text, this.options.buttonStyle);
    button.setClickHandler(callback);
    
    this.buttons.push(button);
    this.add(button);
    
    return button;
  }

  removeButton(button) {
    const index = this.buttons.indexOf(button);
    if (index > -1) {
      this.buttons.splice(index, 1);
      this.remove(button);
      button.destroy();
      this.repositionButtons();
    }
  }

  repositionButtons() {
    this.buttons.forEach((button, index) => {
      const buttonY = this.title ? this.title.y + 100 + (index * this.options.spacing) : index * this.options.spacing;
      button.y = buttonY;
    });
  }

  setTitle(title) {
    if (this.title) {
      this.title.setText(title);
    } else {
      this.title = this.scene.add.text(0, 0, title, this.options.titleStyle);
      this.title.setOrigin(0.5);
      this.add(this.title);
      this.repositionButtons();
    }
  }

  show() {
    this.setVisible(true);
    this.setActive(true);
  }

  hide() {
    this.setVisible(false);
    this.setActive(false);
  }

  fadeIn(duration = 500) {
    this.setAlpha(0);
    this.setVisible(true);
    this.setActive(true);
    
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
        this.setVisible(false);
        this.setActive(false);
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