import { Page, expect } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly tableSelector = 'table';
  readonly energyUsageButton = 'button:has-text("Energy usage")';
  readonly navDashboard = 'text=Dashboard';

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    // assume already logged in and use navbar
    await this.page.click(this.navDashboard);
    await expect(this.page).toHaveURL(/\/dashboard/);
  }

  async getFirstRowText() {
    const row = this.page.locator(`${this.tableSelector} tbody tr`).first();
    return row.textContent();
  }

  async clickEnergyUsage() {
    await this.page.click(this.energyUsageButton);
    await expect(this.page).toHaveURL(/\/enter-usage/);
  }
}
