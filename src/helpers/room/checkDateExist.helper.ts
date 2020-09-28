import { IRoom } from '../../interfaces';

export const checkDateExist = (rooms: IRoom[], currentS: Date, currentE: Date, table_number: number) => {
    const current_start = new Date(currentS).getTime();
    const current_end = new Date(currentE).getTime();

    let existStatus = false;

    const checkFunction = (start_at: Date, close_at: Date) => {
        const startAt = new Date(start_at).getTime();
        const closeAt = new Date(close_at).getTime();

        if (current_end < closeAt && current_end > startAt) {
            existStatus = true;
        }

        if (current_start < closeAt && current_start > startAt) {
            existStatus = true;
        }

        if (current_end >= closeAt && current_start <= startAt) {
            existStatus = true;
        }
    };

    rooms.forEach((room) => {
        if (!0) {
            const filteredBU = room.booked_users.filter(bu => bu.table_number = table_number);
            filteredBU.forEach(({rent_start, rent_end}) => {
                checkFunction(rent_start, rent_end);
            });
        } else {
            checkFunction(room.start_at, room.close_at);
        }
    });

    return existStatus;
};
