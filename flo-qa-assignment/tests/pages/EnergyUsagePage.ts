import { Page, expect } from '@playwright/test';

export class EnergyUsagePage {
  readonly page: Page;
  readonly nmiPrefixSelect = 'select';
  readonly nmiSuffixInput = 'input[name="nmiSuffix"]';
  readonly nextButton = 'button:has-text("Next")';
  readonly consumptionInput = 'input[name="consumption"]';
  readonly submitButton = 'button:has-text("Submit")';
  readonly errorBox = 'text=Invalid form data';

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/enter-usage');
  }

  async fillPrefixAndSuffix(prefix: string, suffix: string) {
    await this.page.selectOption(this.nmiPrefixSelect, prefix);
    await this.page.fill(this.nmiSuffixInput, suffix);
    await this.page.click(this.nextButton);
  }

  async fillConsumption(consumption: string) {
    await this.page.fill(this.consumptionInput, consumption);
    await this.page.click(this.submitButton);
  }

  async expectError() {
    await expect(this.page.locator(this.errorBox)).toBeVisible();
  }
}
