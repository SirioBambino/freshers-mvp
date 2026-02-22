import { expect, test } from '@playwright/test';

test('PWA compliance and offline support', async ({ page, context, browserName }) => {
	test.skip(browserName === 'webkit', 'WebKit/Safari offline emulation is unstable in CI');

	test.slow();

	const failedRequests: string[] = [];
	page.on('requestfailed', (request) => {
		if (request.url().startsWith(page.url())) {
			failedRequests.push(request.url());
		}
	});

	const _swPromise = context.waitForEvent('serviceworker').catch(() => null);

	await page.goto('/');

	const manifest = page.locator('link[rel="manifest"]');
	await expect(manifest).toBeAttached();

	const isReady = await page.evaluate(async () => {
		if ('serviceWorker' in navigator) {
			const registration = await navigator.serviceWorker.ready;
			return !!registration;
		}
		return false;
	});

	expect(isReady).toBe(true);

	await context.setOffline(true);
	await page.reload({ waitUntil: 'load' });

	await expect(page.locator('body')).not.toBeEmpty();
	expect(failedRequests).toHaveLength(0);
});
