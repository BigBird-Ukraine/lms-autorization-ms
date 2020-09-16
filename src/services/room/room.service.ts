import { model } from 'mongoose';

import { DatabaseTablesEnum } from '../../constants/enums';
import { Room, RoomSchema, RoomType } from '../../database/models';
import { IRoom } from '../../interfaces';

class RoomService {

  createRoom(room: IRoom): Promise<any> {
    const newRoom = new Room(room);

    return newRoom.save();
  }

  async findRooms(filter?: any): Promise<IRoom[]> {
    const RoomModel = model<RoomType>(DatabaseTablesEnum.ROOM_COLLECTION_NAME, RoomSchema);

    return RoomModel.find(filter)
      .populate({
        path: 'groups',
        select: {label: 1, _id: 0}
      }) as any;
  }

  updateRoom(room_id: string, room: Partial<IRoom>): Promise<IRoom> {
    const RoomModel = model<RoomType>(DatabaseTablesEnum.ROOM_COLLECTION_NAME, RoomSchema);

    return RoomModel.findByIdAndUpdate(room_id, room, {new: true}) as any;
  }

  async deleteRoom(room_id: string): Promise<void> {
    const RoomModel = model<RoomType>(DatabaseTablesEnum.ROOM_COLLECTION_NAME, RoomSchema);

    await RoomModel.findByIdAndDelete(room_id);
  }
}

export const roomService = new RoomService();
