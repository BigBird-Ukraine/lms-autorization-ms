import * as cron from 'node-cron';

import { NodeCroneScheduleEnum } from '../../constants/enums';
import { userService } from '../../services/user';

export default () => {
    cron.schedule(NodeCroneScheduleEnum.EVERY_DAY_AT_8am, async () => await userService.unblockBookingUsersBan());
};
