import { IGroup } from './group.model';

export interface IRoom {
    _id: string;
    label: string;
    description: string;
    count_all_places: number;
    free_places: number;
    start_at: Date;
    close_at: Date;
    city: string;
    groups: Array<Partial<IGroup>>;
    booked_users: IBookUser[];
    owner_id: string;
    created_at: Date;
}

export interface IBookUser {
    user_id: string;
    table_number: number;
    rent_start: Date;
    rent_end: Date;
}

export interface ISettingRoom {
    label: string;
    start_at: ITime;
    close_at: ITime;
    count_places: number;
    period_time_to_sign_up: number; // h
    cities: string[];
}

export interface ITime {
    hour: number;
    minute: number;
    second: number;
}

export interface ICutRoom {
    _id: string;
    label: string;
    description: string;
    start_at: Date;
    close_at: Date;
    city: string;
    count_all_places: number;
    countBookedPlaces?: number;
    numbersPlaces?: number[];
    idPlaces?: number[];
}
