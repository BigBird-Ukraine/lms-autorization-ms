import { model } from 'mongoose';

import { DatabaseTablesEnum } from '../../constants/enums';
import { GroupSchema, GroupType } from '../../database';
import { IGroup } from '../../interfaces';

class GroupService {
  getAllGroups(filterParams: Partial<IGroup>, limit: number, skip: number, order: string): Promise<any> {
    const GroupModel = model<GroupType>(DatabaseTablesEnum.GROUP_COLLECTION_NAME, GroupSchema);
    return GroupModel
      .find({ filterParams })
      .populate('course_id')
      .populate('users_list')
      .limit(limit)
      .skip(skip)
      .sort(order) as any;
  }

  getSizeOfAll(filterParams: Partial<IGroup>): Promise<any> {
    const GroupModel = model<GroupType>(DatabaseTablesEnum.GROUP_COLLECTION_NAME, GroupSchema);
    return GroupModel
      .countDocuments({ filterParams }) as any;
  }

  async getById(group_id: string): Promise<any> {
    const GroupModel = model<GroupType>(DatabaseTablesEnum.GROUP_COLLECTION_NAME, GroupSchema);
    return GroupModel.findById(group_id) as any;
  }

  async addVisit_log(group_id: string, visit_log: Partial<IGroup>): Promise<void> {
    const GroupModel = model<GroupType>(DatabaseTablesEnum.GROUP_COLLECTION_NAME, GroupSchema);

    return GroupModel.findByIdAndUpdate(group_id, {$set: {attendance: visit_log}}) as any;
  }

  async getStudentsList(group_id: string): Promise<Partial<IGroup>> {
    const GroupModel = model<GroupType>(DatabaseTablesEnum.GROUP_COLLECTION_NAME, GroupSchema);

    return GroupModel.findById(group_id)
      .populate('users_list', {password : 0})
      .select({users_list: 1, _id: 0}) as any;
  }
}

export const groupService = new GroupService();
