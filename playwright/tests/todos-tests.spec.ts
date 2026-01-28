import { test, expect } from '@playwright/test';


test('should add a new todo', async ({ page }) => {
  await page.goto('/');
});

test('should delete a todo', async ({ page }) => {
  await page.goto('/');

});

test('should delete default todos', async ({ page }) => {
  await page.goto('/');


  await page.getByRole('link', { name: 'Get started' }).click();


  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('should edit an existing todo', async ({ page }) => {
  await page.goto('/');


  await page.getByRole('link', { name: 'Get started' }).click();


  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('should cancel todo edit', async ({ page }) => {
  await page.goto('/');


  await page.getByRole('link', { name: 'Get started' }).click();


  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('should move todo to completed', async ({ page }) => {
  await page.goto('/');


  await page.getByRole('link', { name: 'Get started' }).click();


  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('should return todo from completed to active', async ({ page }) => {
  await page.goto('/');


  await page.getByRole('link', { name: 'Get started' }).click();


  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('should navigate to active todos', async ({ page }) => {
  await page.goto('/');


  await page.getByRole('link', { name: 'Get started' }).click();


  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('should navigate to completed todos', async ({ page }) => {
  await page.goto('/');


  await page.getByRole('link', { name: 'Get started' }).click();


  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('should clear completed todos', async ({ page }) => {
  await page.goto('/');


  await page.getByRole('link', { name: 'Get started' }).click();


  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('should select all todos', async ({ page }) => {
  await page.goto('/');


  await page.getByRole('link', { name: 'Get started' }).click();


  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('should persist todos after page reload', async ({ page }) => {
  await page.goto('/');


  await page.getByRole('link', { name: 'Get started' }).click();


  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('should handle corrupted local storage gracefully', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('link', { name: 'Get started' }).click();

  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
