export class GameUtils {
  static randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static randomFloat(min, max) {
    return Math.random() * (max - min) + min;
  }

  static randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  static shuffleArray(array) {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  static formatScore(score) {
    return score.toString().padStart(6, '0');
  }

  static formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  static easeInOut(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  static easeIn(t) {
    return t * t;
  }

  static easeOut(t) {
    return 1 - Math.pow(1 - t, 2);
  }

  static debounce(func, wait) {
    let timeout = null;
    return (...args) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }

  static throttle(func, limit) {
    let inThrottle;
    return (...args) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  static uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  static deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof Array) return obj.map(item => this.deepClone(item));
    if (typeof obj === 'object') {
      const cloned = {};
      Object.keys(obj).forEach(key => {
        cloned[key] = this.deepClone(obj[key]);
      });
      return cloned;
    }
  }

  static isRectCollision(rect1, rect2) {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    );
  }

  static isCircleCollision(circle1, circle2) {
    const dx = circle1.x - circle2.x;
    const dy = circle1.y - circle2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < circle1.radius + circle2.radius;
  }
}
