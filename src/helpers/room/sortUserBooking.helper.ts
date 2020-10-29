import { IRoom } from '../../interfaces';

export const sortUserBooking = (rooms: IRoom[], userId: string) => {
    rooms.forEach(item => {
        item.booked_users = item.booked_users.filter(bu => bu.user_id.toString() === userId.toString());
    });

    return rooms;
};
