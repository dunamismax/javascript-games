import { PhysicsUtils } from '@js-games/game-logic';

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
    
    this.player1Score = 0;
    this.player2Score = 0;
    this.gameSpeed = 300;
    this.paddleSpeed = 400;
    this.isPaused = false;
    this.winningScore = 5;
  }

  create() {
    this.createGame();
    this.createUI();
    this.setupInput();
    this.setupPhysics();
  }

  createGame() {
    this.add.line(400, 300, 0, 0, 0, 600, 0xffffff).setLineWidth(2);
    
    for (let i = 0; i < 600; i += 20) {
      this.add.line(400, i + 10, 0, 0, 0, 10, 0xffffff).setLineWidth(2);
    }

    this.paddle1 = this.add.rectangle(30, 300, 10, 80, 0xffffff);
    this.paddle2 = this.add.rectangle(770, 300, 10, 80, 0xffffff);
    
    this.ball = this.add.circle(400, 300, 8, 0xffffff);

    this.physics.add.existing(this.paddle1, false);
    this.physics.add.existing(this.paddle2, false);
    this.physics.add.existing(this.ball, false);

    this.paddle1.body.setImmovable(true);
    this.paddle2.body.setImmovable(true);
    this.ball.body.setBounce(1, 1);
    this.ball.body.setCollideWorldBounds(true);
    
    this.resetBall();
  }

  createUI() {
    this.scoreText1 = this.add.text(200, 50, '0', {
      fontSize: '48px',
      fontFamily: 'Arial',
      color: '#ffffff'
    }).setOrigin(0.5);

    this.scoreText2 = this.add.text(600, 50, '0', {
      fontSize: '48px',
      fontFamily: 'Arial',
      color: '#ffffff'
    }).setOrigin(0.5);

    this.pauseText = this.add.text(400, 300, 'PAUSED', {
      fontSize: '48px',
      fontFamily: 'Arial',
      color: '#ffffff'
    }).setOrigin(0.5);
    this.pauseText.setVisible(false);
  }

  setupInput() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    
    this.spaceKey.on('down', () => {
      this.togglePause();
    });
  }

  setupPhysics() {
    this.physics.add.collider(this.ball, this.paddle1, this.ballHitPaddle, null, this);
    this.physics.add.collider(this.ball, this.paddle2, this.ballHitPaddle, null, this);
    
    this.ball.body.onWorldBounds = true;
    this.physics.world.on('worldbounds', this.ballHitWall, this);
  }

  ballHitPaddle(ball, paddle) {
    const paddleCenter = paddle.y;
    const ballCenter = ball.y;
    const diff = ballCenter - paddleCenter;
    const maxDiff = paddle.height / 2;
    
    const angle = (diff / maxDiff) * Math.PI / 4;
    const direction = paddle === this.paddle1 ? 1 : -1;
    
    const velocity = PhysicsUtils.createVector2(
      Math.cos(angle) * this.gameSpeed * direction,
      Math.sin(angle) * this.gameSpeed
    );
    
    ball.body.setVelocity(velocity.x, velocity.y);
  }

  ballHitWall(event, body) {
    if (body !== this.ball.body) return;
    
    if (event.worldBounds.x < 0) {
      this.player2Score++;
      this.updateScore();
      this.resetBall();
    } else if (event.worldBounds.x > 0) {
      this.player1Score++;
      this.updateScore();
      this.resetBall();
    }
  }

  resetBall() {
    this.ball.setPosition(400, 300);
    
    const angle = Phaser.Math.Between(-30, 30) * Math.PI / 180;
    const direction = Phaser.Math.Between(0, 1) === 0 ? -1 : 1;
    
    const velocity = PhysicsUtils.createVector2(
      Math.cos(angle) * this.gameSpeed * direction,
      Math.sin(angle) * this.gameSpeed
    );
    
    this.ball.body.setVelocity(velocity.x, velocity.y);
  }

  updateScore() {
    this.scoreText1.setText(this.player1Score.toString());
    this.scoreText2.setText(this.player2Score.toString());
    
    if (this.player1Score >= this.winningScore || this.player2Score >= this.winningScore) {
      this.endGame();
    }
  }

  endGame() {
    this.scene.start('GameOverScene', {
      player1Score: this.player1Score,
      player2Score: this.player2Score,
      winner: this.player1Score >= this.winningScore ? 'Player 1' : 'Player 2'
    });
  }

  togglePause() {
    if (this.isPaused) {
      this.physics.resume();
      this.pauseText.setVisible(false);
      this.isPaused = false;
    } else {
      this.physics.pause();
      this.pauseText.setVisible(true);
      this.isPaused = true;
    }
  }

  update() {
    if (this.isPaused) return;
    
    if (this.wKey.isDown && this.paddle1.y > 40) {
      this.paddle1.y -= this.paddleSpeed * (1/60);
    } else if (this.sKey.isDown && this.paddle1.y < 560) {
      this.paddle1.y += this.paddleSpeed * (1/60);
    }
    
    if (this.cursors.up.isDown && this.paddle2.y > 40) {
      this.paddle2.y -= this.paddleSpeed * (1/60);
    } else if (this.cursors.down.isDown && this.paddle2.y < 560) {
      this.paddle2.y += this.paddleSpeed * (1/60);
    }
    
    this.paddle1.body.y = this.paddle1.y - 40;
    this.paddle2.body.y = this.paddle2.y - 40;
  }
}