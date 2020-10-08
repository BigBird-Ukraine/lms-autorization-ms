import * as resetBookingStatus from './room/resetBookingStatus.cron';
import * as unblockBookingUsersBan from './room/unblockBookingUsersBan.cron';

export const connection = () => {
    unblockBookingUsersBan.default();
    resetBookingStatus.default();
};
