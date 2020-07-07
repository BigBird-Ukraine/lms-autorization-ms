import { NextFunction, Response } from 'express';

import { ResponseStatusCodesEnum } from '../../constants';
import { ErrorHandler, errors } from '../../errors';
import { IRequestExtended } from '../../interfaces';
import { moduleService } from '../../services';

export const isModulePresent = async (req: IRequestExtended, res: Response, next: NextFunction) => {

    const {module_id} = req.params;

    const module = await moduleService.getModuleByID(module_id);

    if (!module) {
        return next(new ErrorHandler(
            ResponseStatusCodesEnum.NOT_FOUND,
            errors.NOT_FOUND_MODULE_PRESENT.message,
            errors.NOT_FOUND_MODULE_PRESENT.code
        ));
    }

    req.module = module;

    next();
};
