import cron from 'node-cron';

cron.schedule('4 16 * * *', async () => {
    console.log(1);
});
