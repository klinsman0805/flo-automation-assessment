import { test, expect } from '@playwright/test';
import { login } from './helpers';
import { EnergyUsagePage } from './pages/EnergyUsagePage';


test.describe('Energy usage multi-step form', () => {
  let form: EnergyUsagePage;

  test.beforeEach(async ({ page }) => {
    await login(page);
    form = new EnergyUsagePage(page);
    await form.goto();
  });

  test('invalid NMI shows error message and stays on step', async () => {
    await form.fillPrefixAndSuffix('NEM', '123');
    await form.expectError();
    await expect(form.page.locator('button:has-text("Next")')).toBeVisible();
  });

  test('complete happy path and redirect to dashboard', async ({ page }) => {
    await form.fillPrefixAndSuffix('NEM', '1201010');
    await form.fillConsumption('2.5');

    await page.waitForURL(/\/dashboard/);
    await expect(page.locator('table')).toContainText('2.5');
  });
});
