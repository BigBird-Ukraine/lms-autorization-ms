import { IRoom } from '../../interfaces';
import { checkFunctionLogic } from './checkDateLogic.helper';

export const checkDateExist = (rooms: IRoom[], currentS: Date, currentE: Date, table_number: number) => {
    let existStatus = false;
    console.log(rooms);

    rooms.forEach((room) => {
        if (table_number > 0 && !existStatus) {
            const filteredBU = room.booked_users.filter(bu => bu.table_number === table_number);
            filteredBU.forEach(({rent_start, rent_end}) => {
                existStatus = checkFunctionLogic(rent_start, rent_end, currentS, currentE);
            });
        } else {
            existStatus = checkFunctionLogic(room.start_at, room.close_at, currentS, currentE);
        }
    });

    return existStatus;
};
