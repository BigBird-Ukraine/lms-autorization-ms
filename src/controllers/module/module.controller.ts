import {NextFunction, Response} from 'express'

import {calculationPageCount, moduleSortingAttributes, regexFilterParams} from '../../helpers';
import {IRequestExtended} from '../../interfaces';
import {moduleService} from '../../services';

class ModuleController {

    async getModules(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const {
                limit = 20,
                offset = 0,
                sort = '_id',
                order,
                ...filter
            } = req.query;

            moduleSortingAttributes(sort);
            const updatedFilterParams = regexFilterParams(filter);

            const modules = await moduleService.getModulesByParams(+limit, +offset, sort, order, filter);
            const count = await moduleService.getSizeOfAll(updatedFilterParams) as number;

            res.json({
                data: {
                    modules,
                    count: count,
                    pageCount: calculationPageCount(count, limit)
                }
            });
        } catch (e) {
            next(e)
        }
    }

    async getModuleById(req: IRequestExtended, res: Response, next: NextFunction) {
        const module = req.module;

        res.json({
            data: module
        });
    }
}

export const moduleController = new ModuleController();
