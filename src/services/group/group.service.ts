import { model } from 'mongoose';

import { DatabaseTablesEnum } from '../../constants/enums';
import { GroupSchema, GroupType } from '../../database';
import { IAttendance, IGroup } from '../../interfaces';

class GroupService {
  getAllGroups(filterParams: Partial<IGroup>, limit: number, skip: number, order: string): Promise<any> {
    const GroupModel = model<GroupType>(DatabaseTablesEnum.GROUP_COLLECTION_NAME, GroupSchema);
    return GroupModel
      .find(filterParams)
      .populate('course_id')
      .populate('users_list')
      .limit(limit)
      .skip(skip)
      .sort(order) as any;
  }

  getSizeOfAll(filterParams: Partial<IGroup>): Promise<any> {
    const GroupModel = model<GroupType>(DatabaseTablesEnum.GROUP_COLLECTION_NAME, GroupSchema);
    return GroupModel
      .countDocuments(filterParams) as any;
  }

  async getById(group_id: string): Promise<IGroup> {
    const GroupModel = model<GroupType>(DatabaseTablesEnum.GROUP_COLLECTION_NAME, GroupSchema);
    return GroupModel.findById(group_id) as any;
  }

  async addVisit_log(group_id: string, visit_log: IAttendance): Promise<void> {
    const GroupModel = model<GroupType>(DatabaseTablesEnum.GROUP_COLLECTION_NAME, GroupSchema);

    const group = await GroupModel.findById(group_id);
    if (group) {
      const index = group.attendance.findIndex(el => el.date === visit_log.date);
      index === -1 ? group.attendance.push(visit_log) : group.attendance[index] = visit_log;
    }

    return group && GroupModel.findByIdAndUpdate(group_id, {$set: {attendance: group.attendance}}) as any;
  }

  async getStudentsList(group_id: string): Promise<Partial<IGroup>> {
    const GroupModel = model<GroupType>(DatabaseTablesEnum.GROUP_COLLECTION_NAME, GroupSchema);

    return GroupModel.findById(group_id)
      .populate('users_list', {password: 0})
      .select({users_list: 1, _id: 0}) as any;
  }

  async getVisitLog(group_id: string, date?: Partial<IGroup>): Promise<Partial<IGroup>> {
    const GroupModel = model<GroupType>(DatabaseTablesEnum.GROUP_COLLECTION_NAME, GroupSchema);

    return GroupModel.findById(group_id)
      .populate('attendance.present_students_id', {password: 0})
      .populate('attendance.absent_students_id', {password: 0})
      .select({attendance: 1, _id: 0}) as any;
  }

  getAllGroupsLabel(): Promise<Partial<IGroup[]>> {
    const GroupModel = model<GroupType>(DatabaseTablesEnum.GROUP_COLLECTION_NAME, GroupSchema);

    return GroupModel.find().select({label: 1, _id: 0}) as any;
  }

  async deleteVisitLog(group_id: string, attendance_id: string) {
    const GroupModel = model<GroupType>(DatabaseTablesEnum.GROUP_COLLECTION_NAME, GroupSchema);

    await GroupModel.update(
      {_id: group_id},
      {
        $pull: {
          attendance: {
            _id: attendance_id
          }
        }
      }
    );
  }

  async editVisitLog(group_id: string, attendance: IAttendance[]) {
    const GroupModel = model<GroupType>(DatabaseTablesEnum.GROUP_COLLECTION_NAME, GroupSchema);

    return GroupModel.findByIdAndUpdate(group_id, {attendance});
  }
}

export const groupService = new GroupService();
