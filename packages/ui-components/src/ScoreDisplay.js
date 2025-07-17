export class ScoreDisplay extends Phaser.GameObjects.Container {
  constructor(scene, x, y, options = {}) {
    super(scene, x, y);

    this.scene = scene;
    this.options = {
      label: 'Score',
      initialValue: 0,
      fontSize: '24px',
      fontFamily: 'Arial',
      color: '#ffffff',
      backgroundColor: null,
      padding: { x: 10, y: 5 },
      borderRadius: 5,
      animated: true,
      ...options,
    };

    this.currentScore = this.options.initialValue;
    this.displayScore = this.options.initialValue;

    this.createDisplay();

    scene.add.existing(this);
  }

  createDisplay() {
    const textContent = this.options.label
      ? `${this.options.label}: ${this.formatScore(this.displayScore)}`
      : this.formatScore(this.displayScore);

    this.scoreText = this.scene.add.text(0, 0, textContent, {
      fontSize: this.options.fontSize,
      fontFamily: this.options.fontFamily,
      color: this.options.color,
    });

    this.scoreText.setOrigin(0.5);

    if (this.options.backgroundColor) {
      const textBounds = this.scoreText.getBounds();
      const bgWidth = textBounds.width + this.options.padding.x * 2;
      const bgHeight = textBounds.height + this.options.padding.y * 2;

      this.background = this.scene.add.graphics();
      this.background.fillStyle(
        Phaser.Display.Color.HexStringToColor(this.options.backgroundColor)
          .color
      );
      this.background.fillRoundedRect(
        -bgWidth / 2,
        -bgHeight / 2,
        bgWidth,
        bgHeight,
        this.options.borderRadius
      );

      this.add([this.background, this.scoreText]);
    } else {
      this.add(this.scoreText);
    }
  }

  formatScore(score) {
    return score.toString().padStart(6, '0');
  }

  setScore(score) {
    this.currentScore = score;

    if (this.options.animated) {
      this.animateToScore(score);
    } else {
      this.displayScore = score;
      this.updateDisplay();
    }
  }

  addScore(points) {
    this.setScore(this.currentScore + points);
  }

  animateToScore(targetScore) {
    const startScore = this.displayScore;
    const scoreDiff = targetScore - startScore;

    if (scoreDiff === 0) return;

    this.scene.tweens.add({
      targets: this,
      displayScore: targetScore,
      duration: Math.min(500, Math.abs(scoreDiff) * 2),
      ease: 'Power2',
      onUpdate: () => {
        this.updateDisplay();
      },
    });
  }

  updateDisplay() {
    const score = Math.round(this.displayScore);
    const textContent = this.options.label
      ? `${this.options.label}: ${this.formatScore(score)}`
      : this.formatScore(score);
    this.scoreText.setText(textContent);

    if (this.background) {
      this.background.clear();
      const textBounds = this.scoreText.getBounds();
      const bgWidth = textBounds.width + this.options.padding.x * 2;
      const bgHeight = textBounds.height + this.options.padding.y * 2;

      this.background.fillStyle(
        Phaser.Display.Color.HexStringToColor(this.options.backgroundColor)
          .color
      );
      this.background.fillRoundedRect(
        -bgWidth / 2,
        -bgHeight / 2,
        bgWidth,
        bgHeight,
        this.options.borderRadius
      );
    }
  }

  flashScore() {
    this.scene.tweens.add({
      targets: this.scoreText,
      scaleX: 1.2,
      scaleY: 1.2,
      duration: 100,
      yoyo: true,
      ease: 'Power2',
    });
  }

  setLabel(label) {
    this.options.label = label;
    this.updateDisplay();
  }

  getScore() {
    return this.currentScore;
  }

  reset() {
    this.setScore(this.options.initialValue);
  }

  destroy() {
    super.destroy();
  }
}
