import { NextFunction, Request, Response } from 'express';

class DownloadController {
  ErrorLogFileDownload(req: Request, res: Response, next: NextFunction) {
    const file = `${__dirname}../../../logs/error.log`; // todo resolve issues with undefined directory appRoot
    res.download(file);
  }
}

export const downloadController = new DownloadController();
