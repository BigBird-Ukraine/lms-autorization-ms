import { NextFunction, Response } from 'express';

import { ResponseStatusCodesEnum } from '../../constants';
import { countFreePlaces, getBookTables } from '../../helpers/room';
import { IBookUser, ICutRoom, IRequestExtended, IRoom, IUser } from '../../interfaces';
import { roomService } from '../../services';

class RoomController {

    async getRooms(req: IRequestExtended, res: Response, next: NextFunction) {
        const {...filter} = req.query;

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

    async bookTable(req: IRequestExtended, res: Response, next: NextFunction) {
        const tableBookData = req.body as IBookUser;
        const {room_id} = req.params;

        await roomService.bookTable(tableBookData, room_id);

        res.json(ResponseStatusCodesEnum.CREATED);
    }

    async getBookTable(req: IRequestExtended, res: Response, next: NextFunction) {
        const room = req.room as IRoom;
        const {table_number} = req.params;

        const bookTables = getBookTables(room, table_number);

        res.json(bookTables);
    }

    async deleteBookedUser(req: IRequestExtended, res: Response, next: NextFunction) {
        const {room_id, rent_id} = req.params;

        await roomService.deleteBookedUser(room_id, rent_id);

        res.json(ResponseStatusCodesEnum.NO_CONTENT);
    }
}

export const roomController = new RoomController();
