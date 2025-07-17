import { PhysicsUtils, GameUtils } from '@js-games/game-logic';

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });

    this.gridSize = 20;
    this.score = 0;
    this.snake = [];
    this.food = null;
    this.direction = { x: 1, y: 0 };
    this.nextDirection = { x: 1, y: 0 };
    this.gameSpeed = 150;
    this.isPaused = false;
    this.gameRunning = false;
  }

  create() {
    this.createGrid();
    this.createSnake();
    this.createFood();
    this.createUI();
    this.setupInput();

    this.gameTimer = this.time.addEvent({
      delay: this.gameSpeed,
      callback: this.update,
      callbackScope: this,
      loop: true,
    });

    this.gameRunning = true;
  }

  createGrid() {
    this.gridGraphics = this.add.graphics();
    this.gridGraphics.lineStyle(1, 0x4a7c23, 0.3);

    for (let x = 0; x <= 640; x += this.gridSize) {
      this.gridGraphics.moveTo(x, 0);
      this.gridGraphics.lineTo(x, 640);
    }

    for (let y = 0; y <= 640; y += this.gridSize) {
      this.gridGraphics.moveTo(0, y);
      this.gridGraphics.lineTo(640, y);
    }

    this.gridGraphics.strokePath();
  }

  createSnake() {
    this.snake = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 },
    ];

    this.snakeGraphics = this.add.graphics();
    this.drawSnake();
  }

  createFood() {
    this.placeFood();
    this.foodGraphics = this.add.graphics();
    this.drawFood();
  }

  createUI() {
    this.scoreText = this.add.text(20, 20, `Score: ${this.score}`, {
      fontSize: '20px',
      fontFamily: 'Arial',
      color: '#ffffff',
    });

    this.pauseText = this.add
      .text(320, 320, 'PAUSED', {
        fontSize: '48px',
        fontFamily: 'Arial',
        color: '#ffffff',
      })
      .setOrigin(0.5);
    this.pauseText.setVisible(false);

    this.gameOverText = this.add
      .text(320, 320, 'GAME OVER', {
        fontSize: '48px',
        fontFamily: 'Arial',
        color: '#ff0000',
      })
      .setOrigin(0.5);
    this.gameOverText.setVisible(false);
  }

  setupInput() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.pKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    this.rKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

    this.pKey.on('down', () => {
      this.togglePause();
    });

    this.rKey.on('down', () => {
      if (!this.gameRunning) {
        this.scene.restart();
      }
    });
  }

  handleInput() {
    if (this.cursors.left.isDown || this.aKey.isDown) {
      if (this.direction.x !== 1) {
        this.nextDirection = { x: -1, y: 0 };
      }
    } else if (this.cursors.right.isDown || this.dKey.isDown) {
      if (this.direction.x !== -1) {
        this.nextDirection = { x: 1, y: 0 };
      }
    } else if (this.cursors.up.isDown || this.wKey.isDown) {
      if (this.direction.y !== 1) {
        this.nextDirection = { x: 0, y: -1 };
      }
    } else if (this.cursors.down.isDown || this.sKey.isDown) {
      if (this.direction.y !== -1) {
        this.nextDirection = { x: 0, y: 1 };
      }
    }
  }

  update() {
    if (!this.gameRunning || this.isPaused) return;

    this.handleInput();
    this.direction = { ...this.nextDirection };

    const head = { ...this.snake[0] };
    head.x += this.direction.x;
    head.y += this.direction.y;

    if (this.checkCollision(head)) {
      this.gameOver();
      return;
    }

    this.snake.unshift(head);

    if (head.x === this.food.x && head.y === this.food.y) {
      this.score += 10;
      this.updateScore();
      this.placeFood();
      this.increaseSpeed();
    } else {
      this.snake.pop();
    }

    this.drawSnake();
    this.drawFood();
  }

  checkCollision(head) {
    if (head.x < 0 || head.x >= 32 || head.y < 0 || head.y >= 32) {
      return true;
    }

    for (let segment of this.snake) {
      if (head.x === segment.x && head.y === segment.y) {
        return true;
      }
    }

    return false;
  }

  placeFood() {
    let validPosition = false;

    while (!validPosition) {
      this.food = {
        x: GameUtils.randomInt(0, 31),
        y: GameUtils.randomInt(0, 31),
      };

      validPosition = true;
      for (let segment of this.snake) {
        if (this.food.x === segment.x && this.food.y === segment.y) {
          validPosition = false;
          break;
        }
      }
    }
  }

  drawSnake() {
    this.snakeGraphics.clear();

    this.snake.forEach((segment, index) => {
      const x = segment.x * this.gridSize;
      const y = segment.y * this.gridSize;

      if (index === 0) {
        this.snakeGraphics.fillStyle(0x7cb342);
      } else {
        this.snakeGraphics.fillStyle(0x9ccc65);
      }

      this.snakeGraphics.fillRect(
        x + 1,
        y + 1,
        this.gridSize - 2,
        this.gridSize - 2
      );

      if (index === 0) {
        this.snakeGraphics.fillStyle(0x2e7d32);
        this.snakeGraphics.fillCircle(x + 6, y + 6, 2);
        this.snakeGraphics.fillCircle(x + 14, y + 6, 2);
      }
    });
  }

  drawFood() {
    this.foodGraphics.clear();

    const x = this.food.x * this.gridSize;
    const y = this.food.y * this.gridSize;

    this.foodGraphics.fillStyle(0xff5252);
    this.foodGraphics.fillCircle(
      x + this.gridSize / 2,
      y + this.gridSize / 2,
      this.gridSize / 2 - 2
    );

    this.foodGraphics.fillStyle(0x4caf50);
    this.foodGraphics.fillRect(x + this.gridSize / 2 - 2, y + 2, 4, 4);
  }

  updateScore() {
    this.scoreText.setText(`Score: ${this.score}`);
  }

  increaseSpeed() {
    if (this.score % 50 === 0 && this.gameSpeed > 100) {
      this.gameSpeed -= 10;
      this.gameTimer.delay = this.gameSpeed;
    }
  }

  togglePause() {
    if (!this.gameRunning) return;

    this.isPaused = !this.isPaused;
    this.pauseText.setVisible(this.isPaused);
  }

  gameOver() {
    this.gameRunning = false;
    this.gameTimer.remove();

    this.time.delayedCall(1000, () => {
      this.scene.start('GameOverScene', { score: this.score });
    });
  }
}
