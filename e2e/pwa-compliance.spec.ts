import { expect, test } from '@playwright/test';

test('PWA compliance and offline support', async ({ page, context, browserName }) => {
	test.skip(browserName === 'webkit', 'WebKit/Safari offline emulation is unstable in CI');

	const failedRequests: string[] = [];

	page.on('requestfailed', (request) => {
		if (request.url().startsWith(page.url())) {
			failedRequests.push(request.url());
		}
	});

	const _swPromise = context.waitForEvent('serviceworker');

	await page.goto('/');

	const manifest = page.locator('link[rel="manifest"]');
	await expect(manifest).toBeAttached();

	const isReady = await page.evaluate(async () => {
		const nav = navigator as unknown as Record<string, { ready: Promise<unknown> }>;
		if (nav.serviceWorker) {
			const registration = await nav.serviceWorker.ready;
			return !!registration;
		}
		return false;
	});

	expect(isReady).toBe(true);

	await context.setOffline(true);
	await page.reload({ waitUntil: 'networkidle' });

	await expect(page.locator('body')).not.toBeEmpty();
	expect(failedRequests).toHaveLength(0);
});
