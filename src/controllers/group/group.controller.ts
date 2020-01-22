import { NextFunction, Response } from 'express';
import * as Joi from 'joi';

import { ResponseStatusCodesEnum } from '../../constants';
import { ErrorHandler } from '../../errors';
import { IGroup, IRequestExtended } from '../../interfaces';
import { groupService } from '../../services';
import { groupAttendanceValidator, groupFilterValidator } from '../../validators';

class GroupController {

  async getAllGroups(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const {
        pageSize,
        pageIndex,
        offset = pageSize * pageIndex,
        order = '_id',
        ...filterParams
      } = req.query;
      const filterValidity = Joi.validate(filterParams, groupFilterValidator);

      if (filterValidity.error) {
        return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, filterValidity.error.details[0].message));
      }

      for (const filterParamsKey in filterParams) {
        if (filterParamsKey) {
          filterParams[filterParamsKey] = {$regex: '^' + filterParams[filterParamsKey], $options: 'i'};
        }
      }
      const groups = await groupService.getAllGroups(filterParams, +pageSize, offset, order);
      const count = await groupService.getSizeOfAll(filterParams) as number;
      res.json({
        data: {
          groups,
          count
        }
      });
    } catch (e) {
      next(e);
    }
  }

  async getGroupById(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const group = req.group as IGroup;
      res.json({data: group});
    } catch (e) {
      next(e);
    }
  }

  async getStudentsList(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const { group_id } = req.params;

      const students_list = await groupService.getStudentsList(group_id);

      res.json({data: students_list});
    } catch (e) {
      next(e);
    }
  }

  async addNewVisitLog(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const { group_id } = req.params;

      const visit_log = req.body;

      const visit_logValidity = Joi.validate(visit_log, groupAttendanceValidator);

      if (visit_logValidity.error) {
       return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, visit_logValidity.error.details[0].message));
      }

      await groupService.addVisit_log(group_id, visit_log); // TODO if date the same update.

      res.end();
    } catch (e) {
      next(e);
    }
  }

  async getVisitLog(req: IRequestExtended, res: Response, next: NextFunction) {
   try {
     const { group_id } = req.params;

     const visit_log = await groupService.getVisitLog(group_id);

     res.json({data: visit_log});
   } catch (e) {
     next(e);
   }
  }
}

export const groupController = new GroupController();
