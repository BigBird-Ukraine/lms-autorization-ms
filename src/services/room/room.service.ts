import { model } from 'mongoose';

import * as moment from 'moment';
import { DatabaseTablesEnum, RegExpEnum, UserStatusEnum } from '../../constants/enums';
import {
    Room,
    RoomSchema,
    RoomType,
    SettingRoomScheme,
    SettingRoomType, User
} from '../../database/models';
import { IBookUser, IRoom, ISettingRoom, IUser } from '../../interfaces';

class RoomService {

    createRoom(room: IRoom): Promise<any> {
        const newRoom = new Room(room);

        return newRoom.save();
    }

    async findRooms(filter?: any, params?: any, populate?: any): Promise<IRoom[]> {
        const RoomModel = model<RoomType>(DatabaseTablesEnum.ROOM_COLLECTION_NAME, RoomSchema);
        const currentDate = new Date();

        return RoomModel.find({
            ...filter,
            close_at: {
                $gt: currentDate
            }
        })
            .populate(populate)
            .select(params) as any;
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

    async deleteBookedUser(room_id: string, rent_id: string, user: IUser): Promise<void> {
        const RoomModel = model<RoomType>(DatabaseTablesEnum.ROOM_COLLECTION_NAME, RoomSchema);

        await RoomModel.update({_id: room_id}, {
                $pull: {booked_users: {_id: rent_id}}
            },
            async () => {
                switch (user.booking_ban_status.status) {
                    case UserStatusEnum.ACTIVE: {
                        await User.update(
                            {_id: user._id},
                            {$set: {'booking_ban_status.status': UserStatusEnum.FOREWARNED}},
                            {multi: true}
                        ).exec();
                        break;
                    }

                    case UserStatusEnum.FOREWARNED: {
                        const date = new Date(moment().format(RegExpEnum.date_format));
                        date.setDate(date.getDate() + 10);

                        await User.update(
                            {_id: user._id},
                            {$set: {booking_ban_status: {status: UserStatusEnum.BOOKING_BAN, date}}},
                            {multi: true}
                        ).exec();

                        date.setDate(date.getDate() - 10);
                        await Room.update({
                            'booked_users.user_id': user._id,
                            'start_at': {$gte: date}
                        }, {$pull: {booked_users: {user_id: user._id}}});
                        break;
                    }
                }
            });
    }

    findSettingRooms(filter?: any, select?: any): Promise<ISettingRoom[]> {
        const SettingRoomModel = model<SettingRoomType>(DatabaseTablesEnum.SETTING_ROOM_COLLECTION_NAME, SettingRoomScheme);

        return SettingRoomModel.find(filter).select(select) as any;
    }
}

export const roomService = new RoomService();
