import * as cron from 'node-cron';

import { NodeCroneScheduleEnum } from '../../constants';
import { checkIfUserCame } from '../../helpers';

export default () => {
    cron.schedule(NodeCroneScheduleEnum.EVERY_HALF_HOUR, async () => await checkIfUserCame());
};
