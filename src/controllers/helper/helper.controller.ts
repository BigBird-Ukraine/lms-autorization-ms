import { NextFunction, Request, Response } from 'express';

import { helperService } from '../../services';

class HelperController {

    async getTags(req: Request, res: Response, next: NextFunction) {
        try {
            const tagsArray = await helperService.getHelperTags();

            res.json(tagsArray);
        } catch (e) {
            next(e);
        }
    }

    async getLevels(req: Request, res: Response, next: NextFunction) {
        try {
            const levelsArray = await helperService.getHelperLevel();

            res.json(levelsArray);
        } catch (e) {
            next(e);
        }

    }

    async getSubjects(req: Request, res: Response, next: NextFunction) {
        try {
            const subjectsArray = await helperService.getHelperSubject();

            res.json(subjectsArray);
         } catch (e) {
             next(e);
         }
    }

    async getGroups(req: Request, res: Response, next: NextFunction) {
        try {
            const groupsArray = await helperService.getHelperGroup();

            res.json(groupsArray);
        } catch (e) {
            next(e);
        }
    }
}

export const helperController = new HelperController();
