import { NextFunction, Response } from 'express';
import * as Joi from 'joi';

import { ResponseStatusCodesEnum } from '../../constants';
import { ErrorHandler } from '../../errors';
import { IModule, IRequestExtended } from '../../interfaces';
import { moduleService } from '../../services';
import { moduleFilterValitator } from '../../validators';

const moduleSortingAttributes: Array<keyof IModule> = ['_id', 'label', 'tags', 'courses_id', 'lessons'];

class ModuleController {

  async getModules(req: IRequestExtended, res: Response, next: NextFunction) {

    const {
      limit = 20,
      offset = 0,
      sort = '_id',
      order,
      ...filter
    } = req.query;

    const filterValidity = Joi.validate(filter, moduleFilterValitator);

    if (filterValidity.error) {
      return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, filterValidity.error.details[0].message));
    }

    if (!moduleSortingAttributes.includes(sort)) {
      return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, 'You can\'t sort by this parameter'));
    }

    const modules = await moduleService.getModulesByParams(+limit, +offset, sort, order, filter);
    const count = modules.length;
    const pageCount = Math.ceil(count / limit);

    res.json({
      data: {
        modules,
        count,
        pageCount
      }
    });
  }

  async getModuleById(req: IRequestExtended, res: Response, next: NextFunction) {

    const {module_id} = req.params;

    const module = await moduleService.getModuleByID(module_id);

    res.json({
      data: module
    });
  }
}

export const moduleController = new ModuleController();
