import { IRoom } from './room.model';

export interface IResponseSocket {
    status?: number;
    code?: number;
    message?: string;

    room?: IRoom[];
}
