import { NextFunction, Response } from 'express';
import * as moment from 'moment';

import { RegExpEnum, ResponseStatusCodesEnum, UserRoleEnum } from '../../constants';
import { countFreePlaces, getBookTables, sortUserBooking } from '../../helpers/room';
import { IBookUser, ICutRoom, IRequestExtended, IRoom, IUser } from '../../interfaces';
import { roomService } from '../../services';

class RoomController {

    async getRooms(req: IRequestExtended, res: Response, next: NextFunction) {
        const user = req.user as IUser;
        let {...filter} = req.query;

        if (user.role_id === UserRoleEnum.STUDENT) {
            filter = {...filter, groups: {$in: user.groups_id}};
        }

        const rooms = await roomService.findRooms(filter, null, {
            path: 'groups',
            select: {label: 1, _id: 0}
        });

        res.json(rooms);
    }

    async getMyRooms(req: IRequestExtended, res: Response, next: NextFunction) {
        const {_id} = req.user as IUser;

        const rooms = await roomService.findRooms({owner_id: _id}, null, {
            path: 'groups',
            select: {label: 1, _id: 0}
        });

        res.json(rooms);
    }

    async getSingleRoom(req: IRequestExtended, res: Response, next: NextFunction) {
        const room: IRoom = req.room as IRoom;

        const cutRoom: ICutRoom = countFreePlaces(room);

        res.json(cutRoom);
    }

    async createRoom(req: IRequestExtended, res: Response, next: NextFunction) {
        const room = req.body as IRoom;
        const {_id} = req.user as IUser;

        await roomService.createRoom({...room, owner_id: _id});

        res.json(ResponseStatusCodesEnum.CREATED);
    }

    async deleteRoom(req: IRequestExtended, res: Response, next: NextFunction) {
        const {room_id} = req.params;

        await roomService.deleteRoom(room_id);

        res.json(ResponseStatusCodesEnum.NO_CONTENT);
    }

    async updateRoom(req: IRequestExtended, res: Response, next: NextFunction) {
        const {room_id} = req.params;
        const room = req.body as Partial<IRoom>;

        const updatedRoom = await roomService.updateRoom(room_id, room);

        res.json(updatedRoom);
    }

    async getSettingRooms(req: IRequestExtended, res: Response, next: NextFunction) {
        const {select, ...filter} = req.query;

        const rooms = await roomService.findSettingRooms(filter, select && JSON.parse(select));

        res.json(rooms);
    }

    async getBookTable(req: IRequestExtended, res: Response, next: NextFunction) {
        const room = req.room as IRoom;
        const {table_number} = req.params;

        const bookTables = getBookTables(room, table_number);

        res.json(bookTables);
    }

    async getMyBooking(req: IRequestExtended, res: Response, next: NextFunction) {
        const user = req.user as IUser;
        const date = new Date(moment().format(RegExpEnum.date_format));

        const myBooking = await roomService.findRooms({
            'booked_users.user_id': user._id,
            'booked_users.rent_end': {$gte: date}
        }, {booked_users: 1, label: 1, start_at: 1, close_at: 1});

        const sortedRooms = sortUserBooking(myBooking, user._id);

        res.json(sortedRooms);
    }

    async updateConfirmStatus(req: IRequestExtended, res: Response, next: NextFunction) {
        // const {_id} = req.body as Partial<IBookUser>;
        // const room = req.room as IRoom;

        // await roomService.confirmStatus(room._id, _id as string);

        res.json(ResponseStatusCodesEnum.OK);
    }

    // SocketIO
    async bookTable(tableBookData: IBookUser, room_id: string) {
        await roomService.bookTable(tableBookData, room_id);
    }

    async deleteBookedUser(room_id: string, rent_start: Date, table_number: number,  user: IUser) {
        await roomService.deleteBookedUser(room_id, rent_start, table_number, user);
    }
}

export const roomController = new RoomController();
