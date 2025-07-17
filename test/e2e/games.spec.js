import { test, expect } from '@playwright/test';

test.describe('Pong Game', () => {
  test('should load and display menu', async ({ page }) => {
    await page.goto('http://localhost:3000');

    await expect(page.locator('text=PONG')).toBeVisible();
    await expect(page.locator('text=Play')).toBeVisible();
    await expect(page.locator('text=Controls:')).toBeVisible();
  });

  test('should start game when play button is clicked', async ({ page }) => {
    await page.goto('http://localhost:3000');

    await page.click('text=Play');

    await expect(page.locator('canvas')).toBeVisible();
    await page.waitForTimeout(1000);
  });
});

test.describe('Space Invaders Game', () => {
  test('should load and display menu', async ({ page }) => {
    await page.goto('http://localhost:3001');

    await expect(page.locator('text=SPACE INVADERS')).toBeVisible();
    await expect(page.locator('text=START GAME')).toBeVisible();
    await expect(
      page.locator('text=Defend Earth from alien invasion!')
    ).toBeVisible();
  });

  test('should start game when start button is clicked', async ({ page }) => {
    await page.goto('http://localhost:3001');

    await page.click('text=START GAME');

    await expect(page.locator('canvas')).toBeVisible();
    await page.waitForTimeout(1000);
  });
});

test.describe('Snake Game', () => {
  test('should load and display menu', async ({ page }) => {
    await page.goto('http://localhost:3002');

    await expect(page.locator('text=SNAKE')).toBeVisible();
    await expect(page.locator('text=START GAME')).toBeVisible();
    await expect(page.locator('text=Eat the food, grow longer!')).toBeVisible();
  });

  test('should start game when start button is clicked', async ({ page }) => {
    await page.goto('http://localhost:3002');

    await page.click('text=START GAME');

    await expect(page.locator('canvas')).toBeVisible();
    await page.waitForTimeout(1000);
  });
});
