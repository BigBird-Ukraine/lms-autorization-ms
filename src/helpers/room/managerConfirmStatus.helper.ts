import * as moment from 'moment';

import { RegExpEnum, UserStatusEnum } from '../../constants/enums';
import { Room, User } from '../../database/models';
import { IUser } from '../../interfaces';

export const managerConfirmStatusHelper = async (user: IUser) => {
    switch (user.booking_ban_status.status) {
        case UserStatusEnum.ACTIVE: {
            await User.update(
                {_id: user._id},
                {$set: {'booking_ban_status.status': UserStatusEnum.FOREWARNED}},
                {multi: true}
            ).exec();
            break;
        }

        case UserStatusEnum.FOREWARNED: {
            await User.update(
                {_id: user._id},
                {$set: {'booking_ban_status.status': UserStatusEnum.FOREWARNED2}},
                {multi: true}
            ).exec();
            break;
        }

        case UserStatusEnum.FOREWARNED2: {
            const date = new Date(moment().format(RegExpEnum.date_format));
            date.setDate(date.getDate() + 14);

            await User.update(
                {_id: user._id},
                {$set: {booking_ban_status: {status: UserStatusEnum.BOOKING_BAN, date}}},
                {multi: true}
            ).exec();

            date.setDate(date.getDate() - 14);
            await Room.update({
                'booked_users.user_id': user._id,
                'start_at': {$gte: date}
            }, {$pull: {booked_users: {user_id: user._id}}});
            break;
        }
    }
};
