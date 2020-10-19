import { NextFunction, Request, Response } from 'express';

import { ipService } from '../../services';

export class IpController {
  async getIp(req: Request, res: Response, next: NextFunction) {
    const ips = await ipService.getIps();
    console.log(ips);
    res.json(ips);
  }
}

export const ipController = new IpController();
