export interface IUserByToken {
    _id: string;
    name: string;
    surname: string;
    role_id: string | number;
    status_id: string | number;
    photo_path?: string;
    group_id?: [string];
}
