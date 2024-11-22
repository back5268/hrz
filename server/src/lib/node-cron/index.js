import cron from 'node-cron';
import { warningTimekeeping } from './timekeepingCr';

cron.schedule('0,30 * * * *', async () => {
    await warningTimekeeping()
});
