import * as roomSockets from './room/room.socket';

export const connection = () => {
    roomSockets.default();
};
