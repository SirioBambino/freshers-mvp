import { defineConfig } from '@playwright/test';

export default defineConfig({
    webServer: {
        command: 'npm run dev', // Ensure this matches your package.json script
        port: 3000,             // Using 'port' is more stable than 'url'
        reuseExistingServer: !process.env.CI,
        timeout: 120 * 1000,    // Give it 2 minutes to start
        stdout: 'pipe',         // IMPORTANT: Shows server errors in the test log
        stderr: 'pipe',
    },
    use: {
        baseURL: 'http://localhost:3000',
    },
});

