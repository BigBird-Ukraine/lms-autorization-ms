import {NextFunction, Response} from 'express';
import {calculationPageCount, moduleSortingAttributes} from '../../helpers';
import {IRequestExtended} from '../../interfaces';
import {moduleService} from '../../services';

class ModuleController {

    async getModules(req: IRequestExtended, res: Response, next: NextFunction) {

        const {
            limit = 20,
            offset = 0,
            sort = '_id',
            order,
            ...filter
        } = req.query;

        try {
            moduleSortingAttributes(sort);
        } catch (e) {
            next(e)
        }

        const modules = await moduleService.getModulesByParams(+limit, +offset, sort, order, filter);

        res.json({
            data: {
                modules,
                count: modules.length,
                pageCount: calculationPageCount(modules.length, limit)
            }
        });
    }

    async getModuleById(req: IRequestExtended, res: Response, next: NextFunction) {
        const module = req.module;

        res.json({
            data: module
        });
    }
}

export const moduleController = new ModuleController();
