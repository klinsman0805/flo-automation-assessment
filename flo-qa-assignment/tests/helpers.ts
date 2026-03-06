import { Page } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

export const VALID_USERNAME = 'testuser';
export const VALID_PASSWORD = 'testuser2025';

/**
 * Convenience wrapper that uses the LoginPage POM.
 */
export async function login(page: Page) {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(VALID_USERNAME, VALID_PASSWORD);
  await loginPage.expectRedirected();
}
