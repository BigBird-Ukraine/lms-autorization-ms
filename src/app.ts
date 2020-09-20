import * as cors from 'cors';
import * as dotEnv from 'dotenv';
import * as express from 'express';
import { NextFunction, Request, Response } from 'express';
import * as fileUpload from 'express-fileupload';
import * as RateLimit from 'express-rate-limit';
import * as helmet from 'helmet';
import * as mongoose from 'mongoose';
import * as morgan from 'morgan';
import { resolve as resolvePath } from 'path';

dotEnv.config();

import { config, logger } from './configs';
import { ResponseStatusCodesEnum } from './constants';
import { apiRouter, notFoundRouter } from './routes';

const serverRequestLimiter = new RateLimit({
  windowMs: config.serverRateLimits.period,
  max: config.serverRateLimits.maxRequests
});

class App {
  public readonly app: express.Application = express();

  constructor() {
    (global as any).appRoot = resolvePath(__dirname, '../');

    this.app.use(morgan('dev'));
    // @ts-ignore
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(serverRequestLimiter);
    this.app.use(fileUpload());
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: true}));
    this.app.use(express.static(resolvePath((global as any).appRoot, 'static')));
    this.mountRoutes();
    this.setupDB();

    this.app.use(this.logErrors);
    this.app.use(this.clientErrorHandler);
    this.app.use(this.customErrorHandler);
  }

  private setupDB = (): void => {
    mongoose.connect(encodeURI(config.MONGO_URL), {useNewUrlParser: true, useUnifiedTopology: true});
    mongoose.set('useFindAndModify', false);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB Connection error'));
  }

  private mountRoutes(): void {
    this.app.use('/api', apiRouter);
    this.app.use('*', notFoundRouter);
  }

  private logErrors = (err: any, req: Request, res: Response, next: NextFunction): void => {
    logger.error({
      method: req.method,
      url: req.path,
      data: req.body,
      time: new Date(),
      massage: err.message
    });

    next(err);
  }

  private customErrorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
    if (err.parent) {
      err.message = err.parent.sqlMessage;
    }

    res
      .status(err.status || ResponseStatusCodesEnum.SERVER_ERROR)
      .json({
        error: {
          message: err.message || 'Unknown Error',
          code: err.code,
          data: err.data
        }
      });
  }

  private clientErrorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
    if (req.xhr) {
      res
        .status(ResponseStatusCodesEnum.SERVER_ERROR)
        .send({
          error: {
            message: 'Request dependent error!',
            code: err.code,
            data: err.data
          }
        });
    } else {
      next(err);
    }
  }
}

export const app = new App().app;
