export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });

    this.score = 0;
    this.lines = 0;
    this.level = 1;
    this.isPaused = false;
    this.gridWidth = 10;
    this.gridHeight = 20;
    this.blockSize = 30;
    this.offsetX = 250;
    this.offsetY = 50;
    this.dropTime = 1000;
    this.lastDrop = 0;

    this.tetrominoes = {
      I: { blocks: [[1, 1, 1, 1]], color: 0x00ffff },
      O: {
        blocks: [
          [1, 1],
          [1, 1],
        ],
        color: 0xffff00,
      },
      T: {
        blocks: [
          [0, 1, 0],
          [1, 1, 1],
        ],
        color: 0x800080,
      },
      S: {
        blocks: [
          [0, 1, 1],
          [1, 1, 0],
        ],
        color: 0x00ff00,
      },
      Z: {
        blocks: [
          [1, 1, 0],
          [0, 1, 1],
        ],
        color: 0xff0000,
      },
      J: {
        blocks: [
          [1, 0, 0],
          [1, 1, 1],
        ],
        color: 0x0000ff,
      },
      L: {
        blocks: [
          [0, 0, 1],
          [1, 1, 1],
        ],
        color: 0xffa500,
      },
    };

    this.tetrominoKeys = Object.keys(this.tetrominoes);
  }

  create() {
    this.createBoard();
    this.createUI();
    this.setupInput();
    this.resetBoard();
    this.spawnTetromino();
  }

  createBoard() {
    this.board = [];
    for (let y = 0; y < this.gridHeight; y++) {
      this.board[y] = [];
      for (let x = 0; x < this.gridWidth; x++) {
        this.board[y][x] = 0;
      }
    }

    this.add
      .rectangle(
        this.offsetX + (this.gridWidth * this.blockSize) / 2,
        this.offsetY + (this.gridHeight * this.blockSize) / 2,
        this.gridWidth * this.blockSize + 4,
        this.gridHeight * this.blockSize + 4,
        0xffffff
      )
      .setStrokeStyle(2, 0xcccccc);

    this.boardGraphics = this.add.group();
  }

  createUI() {
    this.scoreText = this.add.text(550, 100, `Score: ${this.score}`, {
      fontSize: '24px',
      fontFamily: 'Arial',
      color: '#ffffff',
    });

    this.linesText = this.add.text(550, 140, `Lines: ${this.lines}`, {
      fontSize: '24px',
      fontFamily: 'Arial',
      color: '#ffffff',
    });

    this.levelText = this.add.text(550, 180, `Level: ${this.level}`, {
      fontSize: '24px',
      fontFamily: 'Arial',
      color: '#ffffff',
    });

    this.add.text(550, 250, 'Next:', {
      fontSize: '20px',
      fontFamily: 'Arial',
      color: '#ffffff',
    });

    this.nextPreview = this.add.group();

    this.pauseText = this.add
      .text(400, 300, 'PAUSED', {
        fontSize: '48px',
        fontFamily: 'Arial',
        color: '#ffffff',
      })
      .setOrigin(0.5);
    this.pauseText.setVisible(false);
  }

  setupInput() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.escKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ESC
    );

    this.escKey.on('down', () => {
      this.togglePause();
    });

    this.cursors.left.on('down', () => {
      if (!this.isPaused) this.moveTetromino(-1, 0);
    });

    this.cursors.right.on('down', () => {
      if (!this.isPaused) this.moveTetromino(1, 0);
    });

    this.cursors.down.on('down', () => {
      if (!this.isPaused) this.softDrop();
    });

    this.cursors.up.on('down', () => {
      if (!this.isPaused) this.rotateTetromino();
    });
  }

  resetBoard() {
    this.boardGraphics.clear(true);

    for (let y = 0; y < this.gridHeight; y++) {
      for (let x = 0; x < this.gridWidth; x++) {
        if (this.board[y][x]) {
          this.drawBlock(x, y, this.board[y][x]);
        }
      }
    }
  }

  drawBlock(x, y, color) {
    const block = this.add.rectangle(
      this.offsetX + x * this.blockSize + this.blockSize / 2,
      this.offsetY + y * this.blockSize + this.blockSize / 2,
      this.blockSize - 1,
      this.blockSize - 1,
      color
    );
    this.boardGraphics.add(block);
  }

  spawnTetromino() {
    if (!this.nextTetromino) {
      this.nextTetromino = this.getRandomTetromino();
    }

    this.currentTetromino = this.nextTetromino;
    this.nextTetromino = this.getRandomTetromino();

    this.currentX = Math.floor(this.gridWidth / 2) - 1;
    this.currentY = 0;

    this.updateNextPreview();

    if (
      !this.isValidPosition(
        this.currentTetromino.blocks,
        this.currentX,
        this.currentY
      )
    ) {
      this.endGame();
    }
  }

  getRandomTetromino() {
    const key =
      this.tetrominoKeys[Math.floor(Math.random() * this.tetrominoKeys.length)];
    return {
      blocks: this.tetrominoes[key].blocks,
      color: this.tetrominoes[key].color,
    };
  }

  updateNextPreview() {
    this.nextPreview.clear(true);

    const blocks = this.nextTetromino.blocks;
    for (let y = 0; y < blocks.length; y++) {
      for (let x = 0; x < blocks[y].length; x++) {
        if (blocks[y][x]) {
          const block = this.add.rectangle(
            550 + x * 20 + 10,
            280 + y * 20 + 10,
            18,
            18,
            this.nextTetromino.color
          );
          this.nextPreview.add(block);
        }
      }
    }
  }

  moveTetromino(deltaX, deltaY) {
    const newX = this.currentX + deltaX;
    const newY = this.currentY + deltaY;

    if (this.isValidPosition(this.currentTetromino.blocks, newX, newY)) {
      this.currentX = newX;
      this.currentY = newY;
    } else if (deltaY > 0) {
      this.lockTetromino();
    }
  }

  rotateTetromino() {
    const rotated = this.rotateMatrix(this.currentTetromino.blocks);
    if (this.isValidPosition(rotated, this.currentX, this.currentY)) {
      this.currentTetromino.blocks = rotated;
    }
  }

  rotateMatrix(matrix) {
    const rotated = [];
    const rows = matrix.length;
    const cols = matrix[0].length;

    for (let i = 0; i < cols; i++) {
      rotated[i] = [];
      for (let j = 0; j < rows; j++) {
        rotated[i][j] = matrix[rows - 1 - j][i];
      }
    }

    return rotated;
  }

  isValidPosition(blocks, x, y) {
    for (let py = 0; py < blocks.length; py++) {
      for (let px = 0; px < blocks[py].length; px++) {
        if (blocks[py][px]) {
          const newX = x + px;
          const newY = y + py;

          if (
            newX < 0 ||
            newX >= this.gridWidth ||
            newY >= this.gridHeight ||
            (newY >= 0 && this.board[newY][newX])
          ) {
            return false;
          }
        }
      }
    }
    return true;
  }

  lockTetromino() {
    const blocks = this.currentTetromino.blocks;

    for (let py = 0; py < blocks.length; py++) {
      for (let px = 0; px < blocks[py].length; px++) {
        if (blocks[py][px]) {
          const x = this.currentX + px;
          const y = this.currentY + py;

          if (y >= 0) {
            this.board[y][x] = this.currentTetromino.color;
          }
        }
      }
    }

    this.clearLines();
    this.spawnTetromino();
  }

  clearLines() {
    let linesCleared = 0;

    for (let y = this.gridHeight - 1; y >= 0; y--) {
      let fullLine = true;
      for (let x = 0; x < this.gridWidth; x++) {
        if (!this.board[y][x]) {
          fullLine = false;
          break;
        }
      }

      if (fullLine) {
        this.board.splice(y, 1);
        this.board.unshift(new Array(this.gridWidth).fill(0));
        linesCleared++;
        y++;
      }
    }

    if (linesCleared > 0) {
      this.lines += linesCleared;
      this.score += this.calculateScore(linesCleared);
      this.level = Math.floor(this.lines / 10) + 1;
      this.dropTime = Math.max(100, 1000 - (this.level - 1) * 100);

      this.updateUI();
    }
  }

  calculateScore(lines) {
    const baseScore = [0, 40, 100, 300, 1200];
    return baseScore[lines] * this.level;
  }

  updateUI() {
    this.scoreText.setText(`Score: ${this.score}`);
    this.linesText.setText(`Lines: ${this.lines}`);
    this.levelText.setText(`Level: ${this.level}`);
  }

  softDrop() {
    this.moveTetromino(0, 1);
  }

  endGame() {
    this.scene.start('GameOverScene', {
      score: this.score,
      lines: this.lines,
      level: this.level,
    });
  }

  togglePause() {
    this.isPaused = !this.isPaused;
    this.pauseText.setVisible(this.isPaused);
  }

  update(time) {
    if (this.isPaused) return;

    this.resetBoard();

    if (this.currentTetromino) {
      const blocks = this.currentTetromino.blocks;
      for (let py = 0; py < blocks.length; py++) {
        for (let px = 0; px < blocks[py].length; px++) {
          if (blocks[py][px]) {
            const x = this.currentX + px;
            const y = this.currentY + py;

            if (y >= 0) {
              this.drawBlock(x, y, this.currentTetromino.color);
            }
          }
        }
      }

      if (time - this.lastDrop > this.dropTime) {
        this.moveTetromino(0, 1);
        this.lastDrop = time;
      }
    }
  }
}
