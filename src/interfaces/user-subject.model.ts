export interface IUserSubjectModel {
    _id: string;
    phone_number: string;
    email: string;
    name: string;
    surname: string;
    role_id: number;
    status_id: number;
    photo_path?: string;
    groups_id?: [string];
}
