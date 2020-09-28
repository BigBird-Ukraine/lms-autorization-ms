import { model } from 'mongoose';

import { DatabaseTablesEnum } from '../../constants/enums';
import { Room, RoomSchema, RoomType, SettingRoomScheme, SettingRoomType } from '../../database/models';
import { IBookUser, IRoom, ISettingRoom } from '../../interfaces';

class RoomService {

    createRoom(room: IRoom): Promise<any> {
        const newRoom = new Room(room);

        return newRoom.save();
    }

    async findRooms(filter?: any, params?: any, populate?: any): Promise<IRoom[]> {
        const RoomModel = model<RoomType>(DatabaseTablesEnum.ROOM_COLLECTION_NAME, RoomSchema);

        return RoomModel.find(filter)
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

    async deleteBookedUser(room_id: string, rent_id: string): Promise<void> {
        const RoomModel = model<RoomType>(DatabaseTablesEnum.ROOM_COLLECTION_NAME, RoomSchema);

        await RoomModel.update({_id: room_id}, {
            // @ts-ignore
            $pull: {
                booked_users: {
                    _id: rent_id
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
