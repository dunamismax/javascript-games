export class PhysicsUtils {
  static createVector2(x = 0, y = 0) {
    return { x, y };
  }

  static addVectors(a, b) {
    return { x: a.x + b.x, y: a.y + b.y };
  }

  static subtractVectors(a, b) {
    return { x: a.x - b.x, y: a.y - b.y };
  }

  static multiplyVector(vector, scalar) {
    return { x: vector.x * scalar, y: vector.y * scalar };
  }

  static normalizeVector(vector) {
    const magnitude = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
    if (magnitude === 0) return { x: 0, y: 0 };
    return { x: vector.x / magnitude, y: vector.y / magnitude };
  }

  static distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  static magnitude(vector) {
    return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
  }

  static dotProduct(a, b) {
    return a.x * b.x + a.y * b.y;
  }

  static clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  static lerp(start, end, t) {
    return start + (end - start) * t;
  }

  static wrapAround(value, min, max) {
    const range = max - min;
    return ((value - min) % range + range) % range + min;
  }

  static applyBounds(object, bounds) {
    return {
      x: this.clamp(object.x, 0, bounds.width),
      y: this.clamp(object.y, 0, bounds.height)
    };
  }

  static bounceVelocity(velocity, normal, restitution = 0.8) {
    const dot = this.dotProduct(velocity, normal);
    return this.subtractVectors(velocity, this.multiplyVector(normal, 2 * dot * restitution));
  }

  static moveTowards(current, target, maxDistance) {
    const direction = this.subtractVectors(target, current);
    const distance = this.magnitude(direction);
    
    if (distance <= maxDistance) {
      return target;
    }
    
    const normalizedDirection = this.normalizeVector(direction);
    return this.addVectors(current, this.multiplyVector(normalizedDirection, maxDistance));
  }
}