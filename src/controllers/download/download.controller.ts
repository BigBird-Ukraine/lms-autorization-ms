import { NextFunction, Request, Response } from 'express';

class DownloadController {
    async ErrorLogFileDownload(req: Request, res: Response, next: NextFunction) {
        try {
            const file = `${__dirname}../../../logs/error.log`; // todo resolve issues with undefined directory appRoot
            res.download(file);
        } catch (e) {
            next(e);
        }
    }
}

export const downloadController = new DownloadController();
