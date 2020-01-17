import { ICourse } from './course.model';
import { IUserSubjectModel } from './user-subject.model';

export interface IGroup {
    _id: string;
    label: string;
    course_id: string;
    city: string;
    started_at: string;
    finished_at: string;
    users_list: string[];
    attendance: [{
        date: string;
        present_students_id: IUserSubjectModel[];
        absent_students_id: IUserSubjectModel[];
    }];
    created_at: string;
    updated_at: string;
}

export interface IGroupSubject {
    _id: string;
    label: string;
    course: ICourse;
    city: string;
    started_at: string;
    finished_at: string;
    users_list: IUserSubjectModel[];
    created_at: string;
    updated_at: string;
}
