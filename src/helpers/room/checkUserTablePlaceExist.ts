import { IBookUser } from '../../interfaces';

export const checkUserTablePlaceExist = (booked_users: IBookUser[], userId: string, rent_start: Date) => {
    const rentStart = new Date(rent_start);
    let statusExist = false;

    booked_users.forEach(bu => {
        const BUStart = new Date(bu.rent_start);
        const BUEnd = new Date(bu.rent_end);

        if (rentStart >= BUStart && rentStart < BUEnd) {
            statusExist = true;
            return;
        }
    });

    return statusExist;
};
