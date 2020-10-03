import { IBookUser } from '../../interfaces';
import { checkFunctionLogic } from './checkDateLogic.helper';

export const checkUserTablePlaceExist = (booked_users: IBookUser[], userId: string, rent_start: Date, rent_end: Date) => {
    let statusExist = false;

    const filteredBU = booked_users.filter(bu => bu.user_id.toString() === userId.toString());

    filteredBU.forEach(bu => {
        if (!statusExist) {
            statusExist = checkFunctionLogic(rent_start, rent_end, bu.rent_start, bu.rent_end);
        }
    });

    return statusExist;
};
