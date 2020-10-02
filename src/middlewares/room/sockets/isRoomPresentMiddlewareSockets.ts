import { ObjectID } from 'mongodb';
import { Socket } from 'socket.io';

import { ResponseStatusCodesEnum } from '../../../constants/enums';
import {  errors } from '../../../errors';
import { IRoom, ITableEvent } from '../../../interfaces';
import { roomService } from '../../../services/room';

export const isRoomPresentMiddlewareSockets = async (socket: Socket, events: ITableEvent) => {
    let room: IRoom[];

    if (!ObjectID.isValid(events.room_id)) {
        return {
            status: ResponseStatusCodesEnum.NOT_FOUND,
            code: errors.BAD_REQUEST_WRONG_PARAMS.code,
            message: errors.BAD_REQUEST_WRONG_PARAMS.message
        };
    }

    room = await roomService.findRooms({_id: events.room_id});

    if (!room[0]) {
        return {
            status: ResponseStatusCodesEnum.NOT_FOUND,
            message: errors.NOT_FOUND_ROOM_NOT_PRESENT.message,
            code: errors.NOT_FOUND_ROOM_NOT_PRESENT.code
        };
    }

    return socket.handshake.query.room = room;
};
