import { beforeAll, beforeEach, afterEach, vi } from 'vitest';

beforeAll(() => {
  global.Phaser = {
    Game: vi.fn(),
    Scene: class Scene {
      constructor() {
        this.add = {
          text: vi.fn(),
          rectangle: vi.fn(),
          circle: vi.fn(),
          graphics: vi.fn(),
          existing: vi.fn(),
        };
        this.physics = {
          add: {
            existing: vi.fn(),
            group: vi.fn(),
            collider: vi.fn(),
            overlap: vi.fn(),
          },
          pause: vi.fn(),
          resume: vi.fn(),
          world: {
            on: vi.fn(),
          },
        };
        this.input = {
          keyboard: {
            createCursorKeys: vi.fn(),
            addKey: vi.fn(),
          },
        };
        this.time = {
          addEvent: vi.fn(),
          delayedCall: vi.fn(),
        };
        this.tweens = {
          add: vi.fn(),
        };
        this.scene = {
          start: vi.fn(),
          restart: vi.fn(),
        };
        this.cameras = {
          main: {
            width: 800,
            height: 600,
          },
        };
      }
    },
    GameObjects: {
      Container: class Container {
        constructor() {
          this.add = vi.fn();
          this.remove = vi.fn();
          this.removeAll = vi.fn();
          this.setVisible = vi.fn();
          this.setActive = vi.fn();
          this.setAlpha = vi.fn();
          this.setScale = vi.fn();
          this.setOrigin = vi.fn();
          this.setInteractive = vi.fn();
          this.on = vi.fn();
          this.destroy = vi.fn();
        }
      },
    },
    Math: {
      Between: vi.fn((min, max) => Math.floor(Math.random() * (max - min + 1)) + min),
      FloatBetween: vi.fn((min, max) => Math.random() * (max - min) + min),
    },
    Display: {
      Color: {
        HexStringToColor: vi.fn(() => ({ color: 0xffffff })),
      },
    },
    Input: {
      Keyboard: {
        KeyCodes: {
          W: 87,
          A: 65,
          S: 83,
          D: 68,
          SPACE: 32,
          P: 80,
          R: 82,
          UP: 38,
          DOWN: 40,
          LEFT: 37,
          RIGHT: 39,
        },
      },
    },
  };
});

beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  vi.restoreAllMocks();
});