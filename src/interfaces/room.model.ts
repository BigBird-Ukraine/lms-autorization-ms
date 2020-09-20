import { IGroup } from './group.model';

export interface IRoom {
  _id?: string;
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
}

export interface IBookUser {
  id: string;
  rent_start: Date;
  rent_end: Date;
}
