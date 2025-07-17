import { PhysicsUtils } from '@js-games/game-logic';

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
    
    this.score = 0;
    this.lives = 3;
    this.level = 1;
    this.isPaused = false;
    this.asteroidSizes = { large: 64, medium: 32, small: 16 };
    this.asteroidSpeeds = { large: 50, medium: 100, small: 150 };
    this.shipSpeed = 300;
    this.rotationSpeed = 300;
    this.bulletSpeed = 400;
    this.maxBullets = 4;
  }

  create() {
    this.createGame();
    this.createUI();
    this.setupInput();
    this.setupPhysics();
    this.spawnAsteroids();
  }

  createGame() {
    this.ship = this.add.triangle(400, 300, 0, -10, -8, 8, 8, 8, 0xffffff);
    this.physics.add.existing(this.ship);
    this.ship.body.setDrag(100);
    this.ship.body.setMaxVelocity(200);
    this.ship.body.setCollideWorldBounds(true);
    this.ship.body.onWorldBounds = true;

    this.bullets = this.physics.add.group({
      classType: Phaser.GameObjects.Circle,
      maxSize: this.maxBullets,
      runChildUpdate: true
    });

    this.asteroids = this.physics.add.group();

    this.physics.world.on('worldbounds', (event, body) => {
      if (body.gameObject === this.ship) {
        this.wrapShip();
      }
    });
  }

  createUI() {
    this.scoreText = this.add.text(16, 16, `Score: ${this.score}`, {
      fontSize: '24px',
      fontFamily: 'Arial',
      color: '#ffffff'
    });

    this.livesText = this.add.text(16, 50, `Lives: ${this.lives}`, {
      fontSize: '24px',
      fontFamily: 'Arial',
      color: '#ffffff'
    });

    this.levelText = this.add.text(16, 84, `Level: ${this.level}`, {
      fontSize: '24px',
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
    this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    
    this.escKey.on('down', () => {
      this.togglePause();
    });

    this.spaceKey.on('down', () => {
      if (!this.isPaused) {
        this.fireBullet();
      }
    });
  }

  setupPhysics() {
    this.physics.add.overlap(this.bullets, this.asteroids, this.bulletHitAsteroid, null, this);
    this.physics.add.overlap(this.ship, this.asteroids, this.shipHitAsteroid, null, this);
  }

  spawnAsteroids() {
    const numAsteroids = 4 + this.level;
    
    for (let i = 0; i < numAsteroids; i++) {
      this.createAsteroid('large');
    }
  }

  createAsteroid(size, x, y) {
    if (!x || !y) {
      do {
        x = Phaser.Math.Between(0, 800);
        y = Phaser.Math.Between(0, 600);
      } while (Phaser.Math.Distance.Between(x, y, this.ship.x, this.ship.y) < 100);
    }

    const asteroidSize = this.asteroidSizes[size];
    const asteroid = this.add.polygon(x, y, this.generateAsteroidPoints(asteroidSize), 0xaaaaaa);
    
    this.physics.add.existing(asteroid);
    asteroid.body.setCircle(asteroidSize / 2);
    asteroid.body.setCollideWorldBounds(true);
    asteroid.body.setBounce(1);
    asteroid.body.onWorldBounds = true;
    
    const speed = this.asteroidSpeeds[size];
    const angle = Phaser.Math.Between(0, 360);
    const velocity = PhysicsUtils.createVector2(
      Math.cos(angle * Math.PI / 180) * speed,
      Math.sin(angle * Math.PI / 180) * speed
    );
    
    asteroid.body.setVelocity(velocity.x, velocity.y);
    asteroid.body.setAngularVelocity(Phaser.Math.Between(-100, 100));
    asteroid.size = size;
    
    this.asteroids.add(asteroid);
    
    this.physics.world.on('worldbounds', (event, body) => {
      if (body.gameObject === asteroid) {
        this.wrapAsteroid(asteroid);
      }
    });

    return asteroid;
  }

  generateAsteroidPoints(size) {
    const points = [];
    const numPoints = 8;
    
    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * Math.PI * 2;
      const radius = size / 2 + Phaser.Math.Between(-size/4, size/4);
      points.push([
        Math.cos(angle) * radius,
        Math.sin(angle) * radius
      ]);
    }
    
    return points;
  }

  fireBullet() {
    if (this.bullets.countActive() >= this.maxBullets) return;

    const bullet = this.bullets.get();
    if (!bullet) return;

    bullet.setPosition(this.ship.x, this.ship.y);
    bullet.setActive(true);
    bullet.setVisible(true);
    
    if (!bullet.body) {
      this.physics.add.existing(bullet);
    }
    
    bullet.body.setCircle(2);
    
    const angle = this.ship.rotation - Math.PI / 2;
    const velocity = PhysicsUtils.createVector2(
      Math.cos(angle) * this.bulletSpeed,
      Math.sin(angle) * this.bulletSpeed
    );
    
    bullet.body.setVelocity(velocity.x, velocity.y);
    
    bullet.lifespan = 2000;
    bullet.birth = this.time.now;
  }

  bulletHitAsteroid(bullet, asteroid) {
    bullet.setActive(false);
    bullet.setVisible(false);
    bullet.body.setVelocity(0, 0);
    
    const size = asteroid.size;
    const x = asteroid.x;
    const y = asteroid.y;
    
    asteroid.destroy();
    
    this.updateScore(size);
    
    if (size === 'large') {
      this.createAsteroid('medium', x - 20, y - 20);
      this.createAsteroid('medium', x + 20, y + 20);
    } else if (size === 'medium') {
      this.createAsteroid('small', x - 10, y - 10);
      this.createAsteroid('small', x + 10, y + 10);
    }
    
    if (this.asteroids.countActive() === 0) {
      this.nextLevel();
    }
  }

  shipHitAsteroid(ship, asteroid) {
    this.lives--;
    this.livesText.setText(`Lives: ${this.lives}`);
    
    if (this.lives <= 0) {
      this.endGame();
    } else {
      this.respawnShip();
    }
  }

  respawnShip() {
    this.ship.setPosition(400, 300);
    this.ship.setRotation(0);
    this.ship.body.setVelocity(0, 0);
    
    this.ship.setAlpha(0.5);
    this.time.delayedCall(2000, () => {
      this.ship.setAlpha(1);
    });
  }

  updateScore(asteroidSize) {
    const points = { large: 20, medium: 50, small: 100 };
    this.score += points[asteroidSize];
    this.scoreText.setText(`Score: ${this.score}`);
  }

  nextLevel() {
    this.level++;
    this.levelText.setText(`Level: ${this.level}`);
    
    this.time.delayedCall(1000, () => {
      this.spawnAsteroids();
    });
  }

  wrapShip() {
    if (this.ship.x < 0) this.ship.x = 800;
    if (this.ship.x > 800) this.ship.x = 0;
    if (this.ship.y < 0) this.ship.y = 600;
    if (this.ship.y > 600) this.ship.y = 0;
  }

  wrapAsteroid(asteroid) {
    if (asteroid.x < 0) asteroid.x = 800;
    if (asteroid.x > 800) asteroid.x = 0;
    if (asteroid.y < 0) asteroid.y = 600;
    if (asteroid.y > 600) asteroid.y = 0;
  }

  endGame() {
    this.scene.start('GameOverScene', {
      score: this.score,
      level: this.level
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
    
    if (this.cursors.left.isDown) {
      this.ship.rotation -= this.rotationSpeed * (1/60);
    } else if (this.cursors.right.isDown) {
      this.ship.rotation += this.rotationSpeed * (1/60);
    }
    
    if (this.cursors.up.isDown) {
      const angle = this.ship.rotation - Math.PI / 2;
      const force = PhysicsUtils.createVector2(
        Math.cos(angle) * this.shipSpeed,
        Math.sin(angle) * this.shipSpeed
      );
      this.ship.body.setAcceleration(force.x, force.y);
    } else {
      this.ship.body.setAcceleration(0, 0);
    }
    
    this.bullets.children.entries.forEach(bullet => {
      if (bullet.active && this.time.now - bullet.birth > bullet.lifespan) {
        bullet.setActive(false);
        bullet.setVisible(false);
        bullet.body.setVelocity(0, 0);
      }
      
      if (bullet.active) {
        if (bullet.x < 0) bullet.x = 800;
        if (bullet.x > 800) bullet.x = 0;
        if (bullet.y < 0) bullet.y = 600;
        if (bullet.y > 600) bullet.y = 0;
      }
    });
  }
}