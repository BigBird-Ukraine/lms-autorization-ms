export interface IUserSubjectModel {
    name: string;
    surname: string;
    role_id: number;
    status_id: number;
    photo_path?: string;
    group?: {
        label: string
    };
}
