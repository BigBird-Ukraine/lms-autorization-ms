import { IUser } from './user.model';

export interface IGroup {
    _id: string;
    label: string;
    course_id: string;
    city: string;
    started_at: string;
    finished_at: string;
    users_list: IUser[];
    attendance: IAttendance[];
    created_at: string;
    updated_at: string;
}

export interface IAttendance {
    _id: string;
    date: string;
    present_students_id: string[];
    absent_students_id: string[];
}
