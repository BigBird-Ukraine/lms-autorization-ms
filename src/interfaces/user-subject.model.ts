import { ITestResultModel } from './test_result.model';

export interface IUserSubjectModel {
    _id: string;
    phone_number: string;
    confirm_token?: string;
    email: string;
    name: string;
    surname: string;
    population_point: string;
    role_id: number;
    status_id: number;
    photo_path?: string;
    groups_id?: [string];
    reset_token?: string;
    passed_tests?: [ITestResultModel];
}
