import { PhysicsUtils, GameUtils } from '@js-games/game-logic';

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
    
    this.score = 0;
    this.lives = 3;
    this.level = 1;
    this.isPaused = false;
    this.invaderSpeed = 50;
    this.invaderDropDistance = 20;
    this.playerSpeed = 300;
    this.bulletSpeed = 400;
    this.invaderBulletSpeed = 200;
  }

  create() {
    this.createStars();
    this.createPlayer();
    this.createInvaders();
    this.createUI();
    this.setupInput();
    this.setupPhysics();
    
    this.playerBullets = this.physics.add.group();
    this.invaderBullets = this.physics.add.group();
    
    this.invaderFireTimer = this.time.addEvent({
      delay: 1000,
      callback: this.invaderFire,
      callbackScope: this,
      loop: true
    });
  }

  createStars() {
    this.stars = [];
    for (let i = 0; i < 100; i++) {
      const star = this.add.circle(
        Phaser.Math.Between(0, 800),
        Phaser.Math.Between(0, 600),
        1,
        0xffffff,
        Phaser.Math.FloatBetween(0.3, 1)
      );
      this.stars.push(star);
    }
  }

  createPlayer() {
    this.player = this.add.rectangle(400, 550, 40, 20, 0x00ff00);
    this.physics.add.existing(this.player);
    this.player.body.setCollideWorldBounds(true);
    this.player.body.setImmovable(true);
  }

  createInvaders() {
    this.invaders = this.physics.add.group();
    this.invaderDirection = 1;
    
    const rows = 5;
    const cols = 10;
    const invaderWidth = 30;
    const invaderHeight = 20;
    const spacing = 50;
    
    const startX = 150;
    const startY = 100;
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = startX + (col * spacing);
        const y = startY + (row * spacing);
        
        let color = 0xff0000;
        if (row === 0) color = 0xff0000;
        else if (row === 1 || row === 2) color = 0xffff00;
        else color = 0x00ff00;
        
        const invader = this.add.rectangle(x, y, invaderWidth, invaderHeight, color);
        this.physics.add.existing(invader);
        invader.body.setImmovable(true);
        invader.pointValue = (4 - row) * 10 + 10;
        
        this.invaders.add(invader);
      }
    }
  }

  createUI() {
    this.scoreText = this.add.text(20, 20, `Score: ${this.score}`, {
      fontSize: '20px',
      fontFamily: 'Arial',
      color: '#ffffff'
    });

    this.livesText = this.add.text(20, 50, `Lives: ${this.lives}`, {
      fontSize: '20px',
      fontFamily: 'Arial',
      color: '#ffffff'
    });

    this.levelText = this.add.text(20, 80, `Level: ${this.level}`, {
      fontSize: '20px',
      fontFamily: 'Arial',
      color: '#ffffff'
    });

    this.pauseText = this.add.text(400, 300, 'PAUSED', {
      fontSize: '48px',
      fontFamily: 'Arial',
      color: '#ffffff'
    }).setOrigin(0.5);
    this.pauseText.setVisible(false);
  }

  setupInput() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.pKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    
    this.spaceKey.on('down', () => {
      if (!this.isPaused) this.playerFire();
    });
    
    this.pKey.on('down', () => {
      this.togglePause();
    });
  }

  setupPhysics() {
    this.physics.add.overlap(this.playerBullets, this.invaders, this.playerBulletHitInvader, null, this);
    this.physics.add.overlap(this.invaderBullets, this.player, this.invaderBulletHitPlayer, null, this);
    this.physics.add.overlap(this.playerBullets, this.invaderBullets, this.bulletsCollide, null, this);
  }

  playerFire() {
    if (this.playerBullets.children.size < 3) {
      const bullet = this.add.rectangle(this.player.x, this.player.y - 20, 4, 10, 0xffffff);
      this.physics.add.existing(bullet);
      bullet.body.setVelocityY(-this.bulletSpeed);
      this.playerBullets.add(bullet);
    }
  }

  invaderFire() {
    if (this.isPaused || this.invaders.children.size === 0) return;
    
    const activeInvaders = this.invaders.children.entries.filter(invader => invader.active);
    if (activeInvaders.length === 0) return;
    
    const shooter = GameUtils.randomChoice(activeInvaders);
    const bullet = this.add.rectangle(shooter.x, shooter.y + 15, 4, 10, 0xff0000);
    this.physics.add.existing(bullet);
    bullet.body.setVelocityY(this.invaderBulletSpeed);
    this.invaderBullets.add(bullet);
  }

  playerBulletHitInvader(bullet, invader) {
    bullet.destroy();
    invader.destroy();
    
    this.score += invader.pointValue;
    this.updateScore();
    
    if (this.invaders.children.size === 0) {
      this.nextLevel();
    }
  }

  invaderBulletHitPlayer(bullet, player) {
    bullet.destroy();
    
    this.lives--;
    this.updateLives();
    
    if (this.lives <= 0) {
      this.gameOver();
    } else {
      this.playerHit();
    }
  }

  bulletsCollide(playerBullet, invaderBullet) {
    playerBullet.destroy();
    invaderBullet.destroy();
  }

  playerHit() {
    this.player.setTint(0xff0000);
    this.time.delayedCall(200, () => {
      this.player.clearTint();
    });
  }

  updateScore() {
    this.scoreText.setText(`Score: ${this.score}`);
  }

  updateLives() {
    this.livesText.setText(`Lives: ${this.lives}`);
  }

  nextLevel() {
    this.level++;
    this.levelText.setText(`Level: ${this.level}`);
    this.invaderSpeed += 20;
    this.invaderFireTimer.delay = Math.max(500, this.invaderFireTimer.delay - 100);
    
    this.time.delayedCall(1000, () => {
      this.createInvaders();
    });
  }

  gameOver() {
    this.scene.start('GameOverScene', { score: this.score, level: this.level });
  }

  togglePause() {
    if (this.isPaused) {
      this.physics.resume();
      this.pauseText.setVisible(false);
      this.invaderFireTimer.paused = false;
      this.isPaused = false;
    } else {
      this.physics.pause();
      this.pauseText.setVisible(true);
      this.invaderFireTimer.paused = true;
      this.isPaused = true;
    }
  }

  moveInvaders() {
    if (this.isPaused) return;
    
    let hitEdge = false;
    
    this.invaders.children.entries.forEach(invader => {
      if (invader.active) {
        invader.x += this.invaderDirection * this.invaderSpeed * (1/60);
        
        if (invader.x <= 20 || invader.x >= 780) {
          hitEdge = true;
        }
        
        if (invader.y >= 500) {
          this.gameOver();
        }
      }
    });
    
    if (hitEdge) {
      this.invaderDirection *= -1;
      this.invaders.children.entries.forEach(invader => {
        if (invader.active) {
          invader.y += this.invaderDropDistance;
        }
      });
    }
  }

  update() {
    if (this.isPaused) return;
    
    if (this.cursors.left.isDown && this.player.x > 20) {
      this.player.x -= this.playerSpeed * (1/60);
    } else if (this.cursors.right.isDown && this.player.x < 780) {
      this.player.x += this.playerSpeed * (1/60);
    }
    
    this.moveInvaders();
    
    this.playerBullets.children.entries.forEach(bullet => {
      if (bullet.y < 0) {
        bullet.destroy();
      }
    });
    
    this.invaderBullets.children.entries.forEach(bullet => {
      if (bullet.y > 600) {
        bullet.destroy();
      }
    });
    
    this.stars.forEach(star => {
      star.y += 0.5;
      if (star.y > 600) {
        star.y = 0;
        star.x = Phaser.Math.Between(0, 800);
      }
    });
  }
}