import cron from 'node-cron';
import { updateDiscountStatus } from '../controllers/discountCountroller';


cron.schedule('0 0 * * *', () => {
  updateDiscountStatus()
    .then(() => console.info('Discount status updated'))
    .catch(console.error);
});