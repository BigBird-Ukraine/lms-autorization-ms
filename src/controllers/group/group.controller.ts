import { NextFunction, Response } from 'express';

import { regexFilterParams } from '../../helpers';
import { IGroup, IRequestExtended } from '../../interfaces';
import { groupService } from '../../services';

class GroupController {

  async getAllGroups(req: IRequestExtended, res: Response, next: NextFunction) {
    const {
      pageSize,
      pageIndex,
      offset = pageSize * pageIndex,
      order = '_id',
      ...filterParams
    } = req.query;

    const updatedFilterParams = regexFilterParams(filterParams);

    const groups = await groupService.getAllGroups(updatedFilterParams, +pageSize, offset, order);
    const count = await groupService.getSizeOfAll(updatedFilterParams) as number;

    res.json({
      data: {
        groups,
        count
      }
    });
  }

  getGroupById(req: IRequestExtended, res: Response, next: NextFunction) {
    const group = req.group as IGroup;

    res.json({data: group});
  }

  async getStudentsList(req: IRequestExtended, res: Response, next: NextFunction) {
    const {group_id} = req.params;

    const students_list = await groupService.getStudentsList(group_id);

    res.json({data: students_list});

  }

  async addNewVisitLog(req: IRequestExtended, res: Response, next: NextFunction) {
    const {group_id} = req.params;
    const visit_log = req.body;

    await groupService.addVisit_log(group_id, visit_log); // TODO if date the same update.

    res.end();
  }

  async getVisitLog(req: IRequestExtended, res: Response, next: NextFunction) {
    const {group_id} = req.params;

    const visit_log = await groupService.getVisitLog(group_id);

    res.json({data: visit_log});
  }
}

export const groupController = new GroupController();
