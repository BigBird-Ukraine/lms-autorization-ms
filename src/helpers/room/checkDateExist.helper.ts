import * as moment from 'moment';

import { RegExpEnum } from '../../constants/enums';
import { IRoom } from '../../interfaces';
import { checkFunctionLogic } from './checkDateLogic.helper';

export const checkDateExist = (rooms: IRoom[], currentS: Date, currentE: Date, table_number: number) => {
    const currentDate = new Date(moment().format(RegExpEnum.date_format)).getTime();

    if (new Date(currentS).getTime() < currentDate) {
        return true;
    }

    rooms.forEach((room) => {
        if (table_number) {
            const filteredBU = room.booked_users.filter(bu => bu.table_number === table_number);
            filteredBU.forEach(({rent_start, rent_end}) => {
                const existStatus = checkFunctionLogic(rent_start, rent_end, currentS, currentE);
                checkStatus(existStatus);
            });
        } else {
            const existStatus = checkFunctionLogic(room.start_at, room.close_at, currentS, currentE);
            checkStatus(existStatus);
        }
    });

    return false;
};

const checkStatus = (status: boolean) => {
    if (status) {
        return status;
    }
};
