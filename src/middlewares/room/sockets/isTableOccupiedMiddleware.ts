import { ResponseStatusCodesEnum } from '../../../constants/enums';
import { errors } from '../../../errors';
import { checkDateExist, checkUserTablePlaceExist } from '../../../helpers/room';
import { IBookUser, IRoom, IUser } from '../../../interfaces';

export const isTableOccupiedMiddleware = async (user: IUser, body: IBookUser, room: IRoom[]) => {
    const {_id} = user as IUser;
    const {rent_end, rent_start, table_number} = body as IBookUser;

    const statusExist = checkDateExist(room, rent_start, rent_end, table_number);

    if (statusExist) {
        return {
            status: ResponseStatusCodesEnum.BAD_REQUEST,
            message: errors.BAD_REQUEST_TABLE_ALREADY_EXIST.message,
            code: errors.BAD_REQUEST_TABLE_ALREADY_EXIST.code
        };
    }

    const statusUserTableExist = checkUserTablePlaceExist(room[0].booked_users, _id, rent_start, rent_end);

    if (statusUserTableExist) {
        return {
            status: ResponseStatusCodesEnum.BAD_REQUEST,
            message: errors.BAD_REQUEST_TABLE_ALREADY_EXIST.message,
            code: errors.BAD_REQUEST_TABLE_ALREADY_EXIST.code
        };
    }
};
