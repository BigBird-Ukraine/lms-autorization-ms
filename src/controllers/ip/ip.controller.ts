import { NextFunction, Request, Response } from 'express';

import { apiService } from '../../services';

export class IpController {
  async getIp(req: Request, res: Response, next: NextFunction) {
    const apis = await apiService.getApis();

    res.json(apis);
  }
}

export const apiController = new IpController();
