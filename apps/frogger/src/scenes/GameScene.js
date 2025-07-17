import { PhysicsUtils } from '@js-games/game-logic';

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
    
    this.score = 0;
    this.lives = 3;
    this.level = 1;
    this.isPaused = false;
    this.frogSize = 32;
    this.gridSize = 40;
    this.carSpeed = 100;
    this.logSpeed = 50;
    this.startY = 560;
    this.winY = 40;
  }

  create() {
    this.createWorld();
    this.createFrog();
    this.createTraffic();
    this.createRiver();
    this.createUI();
    this.setupInput();
    this.setupPhysics();
  }

  createWorld() {
    this.add.rectangle(400, 300, 800, 600, 0x228B22);
    
    for (let y = 200; y <= 360; y += 40) {
      this.add.rectangle(400, y, 800, 40, 0x808080);
    }
    
    for (let y = 40; y <= 160; y += 40) {
      this.add.rectangle(400, y, 800, 40, 0x4169E1);
    }
    
    this.add.rectangle(400, 20, 800, 40, 0x32CD32);
    this.add.text(400, 20, 'GOAL', {
      fontSize: '24px',
      fontFamily: 'Arial',
      color: '#000000'
    }).setOrigin(0.5);
  }

  createFrog() {
    this.frog = this.add.rectangle(400, this.startY, this.frogSize, this.frogSize, 0x00FF00);
    this.physics.add.existing(this.frog);
    this.frog.body.setImmovable(true);
    this.resetFrogPosition();
  }

  createTraffic() {
    this.cars = this.physics.add.group();
    
    const roadLanes = [200, 240, 280, 320, 360];
    roadLanes.forEach((y, index) => {
      const direction = index % 2 === 0 ? 1 : -1;
      const speed = this.carSpeed * (1 + this.level * 0.2) * direction;
      
      for (let i = 0; i < 3; i++) {
        const x = direction > 0 ? -100 - (i * 200) : 900 + (i * 200);
        const car = this.add.rectangle(x, y, 60, 30, 0xFF0000);
        this.physics.add.existing(car);
        car.body.setVelocityX(speed);
        car.direction = direction;
        car.lane = y;
        this.cars.add(car);
      }
    });
  }

  createRiver() {
    this.logs = this.physics.add.group();
    this.turtles = this.physics.add.group();
    
    const waterLanes = [40, 80, 120, 160];
    waterLanes.forEach((y, index) => {
      const direction = index % 2 === 0 ? 1 : -1;
      const speed = this.logSpeed * direction;
      
      for (let i = 0; i < 2; i++) {
        const x = direction > 0 ? -150 - (i * 300) : 950 + (i * 300);
        
        if (index % 2 === 0) {
          const log = this.add.rectangle(x, y, 120, 30, 0x8B4513);
          this.physics.add.existing(log);
          log.body.setVelocityX(speed);
          log.direction = direction;
          this.logs.add(log);
        } else {
          const turtle = this.add.rectangle(x, y, 80, 30, 0x228B22);
          this.physics.add.existing(turtle);
          turtle.body.setVelocityX(speed);
          turtle.direction = direction;
          this.turtles.add(turtle);
        }
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
    this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    
    this.escKey.on('down', () => {
      this.togglePause();
    });

    this.cursors.up.on('down', () => {
      if (!this.isPaused) this.moveFrog(0, -this.gridSize);
    });

    this.cursors.down.on('down', () => {
      if (!this.isPaused) this.moveFrog(0, this.gridSize);
    });

    this.cursors.left.on('down', () => {
      if (!this.isPaused) this.moveFrog(-this.gridSize, 0);
    });

    this.cursors.right.on('down', () => {
      if (!this.isPaused) this.moveFrog(this.gridSize, 0);
    });
  }

  setupPhysics() {
    this.physics.add.overlap(this.frog, this.cars, this.frogHitCar, null, this);
  }

  moveFrog(deltaX, deltaY) {
    const newX = Phaser.Math.Clamp(this.frog.x + deltaX, 20, 780);
    const newY = Phaser.Math.Clamp(this.frog.y + deltaY, 20, this.startY);
    
    this.frog.setPosition(newX, newY);
    
    if (this.frog.y <= this.winY) {
      this.frogReachedGoal();
    }
    
    if (this.frog.y < 200 && this.frog.y > 160) {
      this.checkFrogOnPlatform();
    }
  }

  frogHitCar(frog, car) {
    this.frogDied();
  }

  frogDied() {
    this.lives--;
    this.livesText.setText(`Lives: ${this.lives}`);
    
    if (this.lives <= 0) {
      this.endGame();
    } else {
      this.resetFrogPosition();
    }
  }

  frogReachedGoal() {
    this.score += 100 * this.level;
    this.scoreText.setText(`Score: ${this.score}`);
    this.resetFrogPosition();
    
    this.level++;
    this.levelText.setText(`Level: ${this.level}`);
    this.increaseDifficulty();
  }

  checkFrogOnPlatform() {
    let onPlatform = false;
    
    this.logs.children.entries.forEach(log => {
      if (this.physics.overlap(this.frog, log)) {
        onPlatform = true;
        this.frog.x += log.body.velocity.x * (1/60);
      }
    });
    
    this.turtles.children.entries.forEach(turtle => {
      if (this.physics.overlap(this.frog, turtle)) {
        onPlatform = true;
        this.frog.x += turtle.body.velocity.x * (1/60);
      }
    });
    
    if (!onPlatform && this.frog.y >= 40 && this.frog.y <= 160) {
      this.frogDied();
    }
    
    if (this.frog.x < 0 || this.frog.x > 800) {
      this.frogDied();
    }
  }

  resetFrogPosition() {
    this.frog.setPosition(400, this.startY);
  }

  increaseDifficulty() {
    this.cars.children.entries.forEach(car => {
      const newSpeed = car.body.velocity.x * 1.1;
      car.body.setVelocityX(newSpeed);
    });
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
    
    this.cars.children.entries.forEach(car => {
      if (car.direction > 0 && car.x > 900) {
        car.x = -100;
      } else if (car.direction < 0 && car.x < -100) {
        car.x = 900;
      }
    });
    
    this.logs.children.entries.forEach(log => {
      if (log.direction > 0 && log.x > 950) {
        log.x = -150;
      } else if (log.direction < 0 && log.x < -150) {
        log.x = 950;
      }
    });
    
    this.turtles.children.entries.forEach(turtle => {
      if (turtle.direction > 0 && turtle.x > 950) {
        turtle.x = -150;
      } else if (turtle.direction < 0 && turtle.x < -150) {
        turtle.x = 950;
      }
    });
    
    if (this.frog.y >= 40 && this.frog.y <= 160) {
      this.checkFrogOnPlatform();
    }
  }
}