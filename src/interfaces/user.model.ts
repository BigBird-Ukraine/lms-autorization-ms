import { ITestResultFullModel, ITestResultModel } from './test_result.model';

export interface IUser {
    _id: string;
    name: string;
    surname: string;
    phone_number: string;
    email: string;
    password: string;
    status_id: number;
    role_id: number;
    population_point: string;
    photo_path?: string;
    created_at: string;
    updated_at?: string;
    groups_id?: [string];
    confirm_token: string;
    reset_token?: string;
    change_token?: string;
    new_password?: string;
    passed_tests?: [ITestResultModel];
    booking_ban_status: {
        status: number;
        date: Date | null;
    };
}

export interface IFullUserTest {
    _id: string;
    name: string;
    surname: string;
    phone_number: string;
    email: string;
    password: string;
    status_id: number;
    role_id: number;
    population_point: string;
    photo_path?: string;
    created_at: string;
    updated_at?: string;
    groups_id?: [string];
    confirm_token: string;
    reset_token: string;
    change_token: string;
    new_password: string;
    passed_tests?: [ITestResultFullModel];
    booking_ban_status: {
        status: number,
        date: Date | null
    };
}

export interface IChangePassword {
    password: string;
    new_password: string;
}
