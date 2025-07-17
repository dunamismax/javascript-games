export class InputManager {
  constructor() {
    this.keys = {};
    this.mouse = { x: 0, y: 0, isDown: false };
    this.touch = { x: 0, y: 0, isDown: false };
    this.gamepad = null;
    this.callbacks = {};

    this.setupEventListeners();
  }

  setupEventListeners() {
    document.addEventListener('keydown', e => this.handleKeyDown(e));
    document.addEventListener('keyup', e => this.handleKeyUp(e));
    document.addEventListener('mousedown', e => this.handleMouseDown(e));
    document.addEventListener('mouseup', e => this.handleMouseUp(e));
    document.addEventListener('mousemove', e => this.handleMouseMove(e));
    document.addEventListener('touchstart', e => this.handleTouchStart(e));
    document.addEventListener('touchend', e => this.handleTouchEnd(e));
    document.addEventListener('touchmove', e => this.handleTouchMove(e));

    window.addEventListener('gamepadconnected', e =>
      this.handleGamepadConnected(e)
    );
    window.addEventListener('gamepaddisconnected', e =>
      this.handleGamepadDisconnected(e)
    );
  }

  handleKeyDown(event) {
    this.keys[event.code] = true;
    this.triggerCallback('keydown', event.code);
  }

  handleKeyUp(event) {
    this.keys[event.code] = false;
    this.triggerCallback('keyup', event.code);
  }

  handleMouseDown(event) {
    this.mouse.isDown = true;
    this.triggerCallback('mousedown', { x: event.clientX, y: event.clientY });
  }

  handleMouseUp(event) {
    this.mouse.isDown = false;
    this.triggerCallback('mouseup', { x: event.clientX, y: event.clientY });
  }

  handleMouseMove(event) {
    this.mouse.x = event.clientX;
    this.mouse.y = event.clientY;
    this.triggerCallback('mousemove', { x: event.clientX, y: event.clientY });
  }

  handleTouchStart(event) {
    event.preventDefault();
    const touch = event.touches[0];
    this.touch.x = touch.clientX;
    this.touch.y = touch.clientY;
    this.touch.isDown = true;
    this.triggerCallback('touchstart', { x: touch.clientX, y: touch.clientY });
  }

  handleTouchEnd(event) {
    event.preventDefault();
    this.touch.isDown = false;
    this.triggerCallback('touchend', { x: this.touch.x, y: this.touch.y });
  }

  handleTouchMove(event) {
    event.preventDefault();
    const touch = event.touches[0];
    this.touch.x = touch.clientX;
    this.touch.y = touch.clientY;
    this.triggerCallback('touchmove', { x: touch.clientX, y: touch.clientY });
  }

  handleGamepadConnected(event) {
    this.gamepad = event.gamepad;
    this.triggerCallback('gamepadconnected', event.gamepad);
  }

  handleGamepadDisconnected(event) {
    this.gamepad = null;
    this.triggerCallback('gamepaddisconnected', event.gamepad);
  }

  isKeyPressed(keyCode) {
    return this.keys[keyCode] || false;
  }

  isMouseDown() {
    return this.mouse.isDown;
  }

  isTouchDown() {
    return this.touch.isDown;
  }

  getMousePosition() {
    return { x: this.mouse.x, y: this.mouse.y };
  }

  getTouchPosition() {
    return { x: this.touch.x, y: this.touch.y };
  }

  updateGamepad() {
    if (this.gamepad) {
      const gamepads = navigator.getGamepads();
      this.gamepad = gamepads[this.gamepad.index];
    }
  }

  getGamepadButton(buttonIndex) {
    if (!this.gamepad) return false;
    return (
      this.gamepad.buttons[buttonIndex] &&
      this.gamepad.buttons[buttonIndex].pressed
    );
  }

  getGamepadAxis(axisIndex) {
    if (!this.gamepad) return 0;
    return this.gamepad.axes[axisIndex] || 0;
  }

  on(event, callback) {
    if (!this.callbacks[event]) {
      this.callbacks[event] = [];
    }
    this.callbacks[event].push(callback);
  }

  off(event, callback) {
    if (this.callbacks[event]) {
      this.callbacks[event] = this.callbacks[event].filter(
        cb => cb !== callback
      );
    }
  }

  triggerCallback(event, data) {
    if (this.callbacks[event]) {
      this.callbacks[event].forEach(callback => callback(data));
    }
  }

  update() {
    this.updateGamepad();
  }

  destroy() {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('keyup', this.handleKeyUp);
    document.removeEventListener('mousedown', this.handleMouseDown);
    document.removeEventListener('mouseup', this.handleMouseUp);
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('touchstart', this.handleTouchStart);
    document.removeEventListener('touchend', this.handleTouchEnd);
    document.removeEventListener('touchmove', this.handleTouchMove);
    window.removeEventListener('gamepadconnected', this.handleGamepadConnected);
    window.removeEventListener(
      'gamepaddisconnected',
      this.handleGamepadDisconnected
    );
  }
}
