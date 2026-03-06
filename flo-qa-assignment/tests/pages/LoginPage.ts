import { Page, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput = 'input[name="username"]';
  readonly passwordInput = 'input[name="password"]';
  readonly submitButton = 'button:has-text("Login")';
  readonly errorLocator = 'text=Something went wrong';

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(username: string, password: string) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.submitButton);
  }

  async expectRedirected() {
    await expect(this.page).toHaveURL(/\/home/);
  }

  async expectErrorVisible() {
    await expect(this.page.locator(this.errorLocator)).toBeVisible();
  }
}
