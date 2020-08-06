import { ITestResultModel } from './test_result.model';

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
    passed_tests?: [ITestResultModel];
}
