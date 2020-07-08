import { NextFunction, Request, Response } from 'express';

import { helperService } from '../../services';

class HelperController {

  async getTags(req: Request, res: Response, next: NextFunction) {

    const tagsArray = await helperService.getHelperTags();

    res.json(tagsArray);
  }

  async getLevels(req: Request, res: Response, next: NextFunction) {

    const levelsArray = await helperService.getHelperLevel();

    res.json(levelsArray);
  }

  async getSubjects(req: Request, res: Response, next: NextFunction) {

    const subjectsArray = await helperService.getHelperSubject();

    res.json(subjectsArray);
  }

  async getGroups(req: Request, res: Response, next: NextFunction) {

    const groupsArray = await helperService.getHelperGroup();

    res.json(groupsArray);
  }
}

export const helperController = new HelperController();
