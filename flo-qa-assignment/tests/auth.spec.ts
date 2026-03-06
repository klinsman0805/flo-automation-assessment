import { test, expect } from '@playwright/test';
import { VALID_USERNAME, VALID_PASSWORD } from './helpers';
import { LoginPage } from './pages/LoginPage';

// because the login page and form are immediately available we can use the POM

test.describe('Authentication flow', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('happy path: valid credentials redirect to home and store token', async ({ page }) => {
    await loginPage.login(VALID_USERNAME, VALID_PASSWORD);
    await loginPage.expectRedirected();

    const token = await page.evaluate(() => sessionStorage.getItem('authToken'));
    expect(token).toBe('mock-jwt-token-12345');
  });

  test('invalid credentials should show an error message', async () => {
    await loginPage.login(VALID_USERNAME, 'wrongpassword');
    await loginPage.expectErrorVisible();
    await expect(loginPage.page).toHaveURL(/\/login/);
  });
});
