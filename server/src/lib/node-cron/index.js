import cron from 'node-cron';
import { warningTimekeeping } from './timekeepingCr';

cron.schedule('0 18 * * *', async () => {
    await warningTimekeeping()
});
