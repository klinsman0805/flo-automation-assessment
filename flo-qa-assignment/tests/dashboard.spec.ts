import { test, expect } from '@playwright/test';
import { login } from './helpers';
import { DashboardPage } from './pages/DashboardPage';


test.describe('Dashboard page', () => {
  let dashboard: DashboardPage;

  test.beforeEach(async ({ page }) => {
    await login(page);
    dashboard = new DashboardPage(page);
    await dashboard.goto();
  });

  test('shows a table of usage records', async () => {
    const firstRow = await dashboard.getFirstRowText();
    expect(firstRow).toContain('NEM');
  });

  test('energy usage button navigates to the form', async () => {
    await dashboard.clickEnergyUsage();
  });
});
