import { describe, it, expect } from 'vitest';
import { PhysicsUtils, GameUtils } from '../../packages/game-logic/src/index.js';

describe('PhysicsUtils', () => {
  describe('createVector2', () => {
    it('should create a vector with default values', () => {
      const vector = PhysicsUtils.createVector2();
      expect(vector).toEqual({ x: 0, y: 0 });
    });

    it('should create a vector with specified values', () => {
      const vector = PhysicsUtils.createVector2(5, 10);
      expect(vector).toEqual({ x: 5, y: 10 });
    });
  });

  describe('addVectors', () => {
    it('should add two vectors correctly', () => {
      const a = { x: 1, y: 2 };
      const b = { x: 3, y: 4 };
      const result = PhysicsUtils.addVectors(a, b);
      expect(result).toEqual({ x: 4, y: 6 });
    });
  });

  describe('distance', () => {
    it('should calculate distance between two points', () => {
      const a = { x: 0, y: 0 };
      const b = { x: 3, y: 4 };
      const result = PhysicsUtils.distance(a, b);
      expect(result).toBe(5);
    });
  });

  describe('clamp', () => {
    it('should clamp value within range', () => {
      expect(PhysicsUtils.clamp(5, 0, 10)).toBe(5);
      expect(PhysicsUtils.clamp(-5, 0, 10)).toBe(0);
      expect(PhysicsUtils.clamp(15, 0, 10)).toBe(10);
    });
  });
});

describe('GameUtils', () => {
  describe('randomInt', () => {
    it('should return integer within range', () => {
      const result = GameUtils.randomInt(1, 10);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(10);
      expect(Number.isInteger(result)).toBe(true);
    });
  });

  describe('formatScore', () => {
    it('should format score with leading zeros', () => {
      expect(GameUtils.formatScore(123)).toBe('000123');
      expect(GameUtils.formatScore(1000)).toBe('001000');
    });
  });

  describe('shuffleArray', () => {
    it('should return array with same elements', () => {
      const original = [1, 2, 3, 4, 5];
      const shuffled = GameUtils.shuffleArray(original);
      expect(shuffled).toHaveLength(5);
      expect(shuffled.sort()).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe('isRectCollision', () => {
    it('should detect collision between rectangles', () => {
      const rect1 = { x: 0, y: 0, width: 10, height: 10 };
      const rect2 = { x: 5, y: 5, width: 10, height: 10 };
      const rect3 = { x: 20, y: 20, width: 10, height: 10 };
      
      expect(GameUtils.isRectCollision(rect1, rect2)).toBe(true);
      expect(GameUtils.isRectCollision(rect1, rect3)).toBe(false);
    });
  });
});