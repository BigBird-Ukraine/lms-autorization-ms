import * as moment from 'moment';

import { HardWordsEnum, RegExpEnum } from '../../constants/enums';
import { IBookUser, IUser } from '../../interfaces';
import { roomService } from '../../services/room';

export const checkIfUserCame = async () => {
    const currentTime = new Date(moment().format(RegExpEnum.date_format));

    const bookedUsers = await roomService.findRooms(
        {
            'booked_users.rent_end': {$lte: currentTime},
            'booked_users.confirm_status': HardWordsEnum.falsyValue,
            'booked_users.cron_job_touched': HardWordsEnum.falsyValue
        },
        {booked_users: 1},
        'booked_users.user_id'
    );

    if (bookedUsers.length) {
        const [res] = bookedUsers;
        const notConfirmedUsers: IBookUser[] = res.booked_users.filter(
            bu => bu.confirm_status === HardWordsEnum.falsyValue && bu.cron_job_touched === HardWordsEnum.falsyValue
        );

        for await (const buUser of notConfirmedUsers) {
            await roomService.notConfirmAction(buUser.user_id as IUser, res._id, buUser._id as string);
        }
    }
};
