import * as moment from 'moment';
import { model } from 'mongoose';

import { DatabaseTablesEnum, HardWordsEnum, RegExpEnum } from '../../constants/enums';
import {
    Room,
    RoomSchema,
    RoomType,
    SettingRoomScheme,
    SettingRoomType
} from '../../database/models';
import { managerConfirmStatusHelper } from '../../helpers';
import { IBookUser, IRoom, ISettingRoom, IUser } from '../../interfaces';

class RoomService {
    createRoom(room: IRoom): Promise<any> {
        const newRoom = new Room(room);

        return newRoom.save();
    }

    async findRooms(filter?: any, params?: any, populate?: any): Promise<IRoom[]> {
        const RoomModel = model<RoomType>(DatabaseTablesEnum.ROOM_COLLECTION_NAME, RoomSchema);
        const currentDate = new Date(moment().format(RegExpEnum.date_format));

        return RoomModel.find({
            ...filter,
            close_at: {
                $gt: currentDate
            }
        })
            .populate(populate)
            .select(params) as any;
    }

    async findRoomsWithBookingTable(roomId: string): Promise<IRoom[]> {
        const RoomModel = model<RoomType>(DatabaseTablesEnum.ROOM_COLLECTION_NAME, RoomSchema);
        const currentDate = new Date();

        return RoomModel.find({
            _id: roomId,
            close_at: {
                $gt: currentDate
            }
        }).populate({
            path: 'booked_users',
            select: {user_id: 1},
            populate: {
                path: 'user_id',
                select: {name: 1, surname: 1}
            }
        }).select({booked_users: 1}) as any;
    }

    updateRoom(room_id: string, room: Partial<IRoom>): Promise<IRoom> {
        const RoomModel = model<RoomType>(DatabaseTablesEnum.ROOM_COLLECTION_NAME, RoomSchema);

        return RoomModel.findByIdAndUpdate(room_id, room, {new: true}) as any;
    }

    async deleteRoom(room_id: string): Promise<void> {
        const RoomModel = model<RoomType>(DatabaseTablesEnum.ROOM_COLLECTION_NAME, RoomSchema);

        await RoomModel.findByIdAndDelete(room_id);
    }

    async bookTable(tableBookData: IBookUser, room_id: string): Promise<void> {
        const RoomModel = model<RoomType>(DatabaseTablesEnum.ROOM_COLLECTION_NAME, RoomSchema);

        // @ts-ignore
        await RoomModel.findByIdAndUpdate(room_id, {$push: {booked_users: tableBookData}});
    }

    async deleteBookedUser(room_id: string, rent_start: Date, table_number: number, user: IUser): Promise<void> {
        const RoomModel = model<RoomType>(DatabaseTablesEnum.ROOM_COLLECTION_NAME, RoomSchema);

        await RoomModel.findByIdAndUpdate(room_id, {
            $pull: {
                booked_users: {
                    user_id: user._id,
                    rent_start,
                    table_number
                }
            }
        }, async () => {
            await managerConfirmStatusHelper(user);
        });
    }

    findSettingRooms(filter?: any, select?: any): Promise<ISettingRoom[]> {
        const SettingRoomModel = model<SettingRoomType>(DatabaseTablesEnum.SETTING_ROOM_COLLECTION_NAME, SettingRoomScheme);

        return SettingRoomModel.find(filter).select(select) as any;
    }

    async confirmStatus(room_id: string, _id: string): Promise<void> {
        const RoomModel = model<RoomType>(DatabaseTablesEnum.ROOM_COLLECTION_NAME, RoomSchema);

        await RoomModel.update({
                '_id': room_id,
                'booked_users._id': _id
            }, {$set: {'booked_users.$.confirm_status': HardWordsEnum.CONFIRM_BOOKING}},
            {multi: true}
            );
    }

    async notConfirmAction(user: IUser, roomId: string, buId: string): Promise<void> {
        const RoomModel = model<RoomType>(DatabaseTablesEnum.ROOM_COLLECTION_NAME, RoomSchema);

        await RoomModel.update({
                '_id': roomId,
                'booked_users._id': buId
            }, {$set: {'booked_users.$.cron_job_touched': HardWordsEnum.CRON_JOB_TOUCH}},
            {multi: true}
            , async () => {
                await managerConfirmStatusHelper(user);
            });
    }
}

export const roomService = new RoomService();
