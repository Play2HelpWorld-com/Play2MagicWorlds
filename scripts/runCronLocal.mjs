import cron from 'node-cron';
import { config } from 'dotenv';

// Load env variables for the script
config({ path: '.env.local' });

const CRON_SECRET = process.env.CRON_SECRET;

if (!CRON_SECRET) {
    console.error('CRON_SECRET environment variable is not set');
    process.exit(1);
}

console.log('Starting development cron service...');

// Run every 3 minutes
cron.schedule('*/3 * * * *', async () => {
    try {
        console.log("calling the api")
        const response = await fetch('http://localhost:3000/api/cron', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${CRON_SECRET}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Development cron job executed:', data);
    } catch (error) {
        console.error('Development cron job failed:', error);
    }
});

// Keep the script running
process.stdin.resume(); 