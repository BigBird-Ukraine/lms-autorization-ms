import { Request } from 'express-serve-static-core';

import { IQuestion } from './question.model';
import { IUser } from './user.model';

export interface IRequestExtended extends Request {
    user?: IUser;
    files?: any;
    question?: IQuestion;
    photos?: any[]; // TODO
}
