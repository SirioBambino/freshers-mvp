import { test, expect } from '@playwright/test';

test('PWA compliance', async ({ page }) => {
    // Wait for 'domcontentloaded' instead of full 'load' or 'networkidle'
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const manifest = page.locator('link[rel="manifest"]');
    await expect(manifest).toBeAttached({ timeout: 10000 });

    // Use a longer timeout just for the SW registration
    const isRegistered = await page.evaluate(async () => {
        const registration = await navigator.serviceWorker.ready;
        return !!registration;
    }).catch(() => false);

    expect(isRegistered).toBe(true);
});
