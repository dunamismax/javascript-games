export class CollisionUtils {
  static rectangleToRectangle(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
  }

  static circleToCircle(circle1, circle2) {
    const dx = circle1.x - circle2.x;
    const dy = circle1.y - circle2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < circle1.radius + circle2.radius;
  }

  static pointToRectangle(point, rect) {
    return point.x >= rect.x &&
           point.x <= rect.x + rect.width &&
           point.y >= rect.y &&
           point.y <= rect.y + rect.height;
  }

  static pointToCircle(point, circle) {
    const dx = point.x - circle.x;
    const dy = point.y - circle.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance <= circle.radius;
  }

  static circleToRectangle(circle, rect) {
    const closestX = Math.max(rect.x, Math.min(circle.x, rect.x + rect.width));
    const closestY = Math.max(rect.y, Math.min(circle.y, rect.y + rect.height));
    
    const dx = circle.x - closestX;
    const dy = circle.y - closestY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    return distance <= circle.radius;
  }

  static lineToLine(line1, line2) {
    const { x1: x1a, y1: y1a, x2: x2a, y2: y2a } = line1;
    const { x1: x1b, y1: y1b, x2: x2b, y2: y2b } = line2;

    const denominator = (x1a - x2a) * (y1b - y2b) - (y1a - y2a) * (x1b - x2b);
    
    if (denominator === 0) return false;

    const t = ((x1a - x1b) * (y1b - y2b) - (y1a - y1b) * (x1b - x2b)) / denominator;
    const u = -((x1a - x2a) * (y1a - y1b) - (y1a - y2a) * (x1a - x1b)) / denominator;

    return t >= 0 && t <= 1 && u >= 0 && u <= 1;
  }

  static getCollisionSide(rect1, rect2) {
    const centerX1 = rect1.x + rect1.width / 2;
    const centerY1 = rect1.y + rect1.height / 2;
    const centerX2 = rect2.x + rect2.width / 2;
    const centerY2 = rect2.y + rect2.height / 2;

    const dx = centerX2 - centerX1;
    const dy = centerY2 - centerY1;

    const combinedHalfWidths = (rect1.width + rect2.width) / 2;
    const combinedHalfHeights = (rect1.height + rect2.height) / 2;

    const overlapX = combinedHalfWidths - Math.abs(dx);
    const overlapY = combinedHalfHeights - Math.abs(dy);

    if (overlapX < overlapY) {
      return dx > 0 ? 'left' : 'right';
    } else {
      return dy > 0 ? 'top' : 'bottom';
    }
  }

  static separateRectangles(rect1, rect2) {
    const side = this.getCollisionSide(rect1, rect2);
    const separation = { x: 0, y: 0 };

    switch (side) {
      case 'left':
        separation.x = rect2.x - (rect1.x + rect1.width);
        break;
      case 'right':
        separation.x = (rect2.x + rect2.width) - rect1.x;
        break;
      case 'top':
        separation.y = rect2.y - (rect1.y + rect1.height);
        break;
      case 'bottom':
        separation.y = (rect2.y + rect2.height) - rect1.y;
        break;
    }

    return { side, separation };
  }
}