import cron from 'node-cron';

cron.schedule('50 6 * * *', async () => {
    console.log(1);
    
});
