import * as cron from 'node-cron';

import { NodeCroneScheduleEnum } from '../../constants/enums';
import { userService } from '../../services/user';

export default () => {
    cron.schedule(NodeCroneScheduleEnum.ONCE_A_MONTH, async () => await userService.resetBookingStatus());
};
