import { Request } from 'express-serve-static-core';
import { ILesson } from './lesson.model';

import { IQuestion } from './question.model';
import { IUser } from './user.model';

export interface IRequestExtended extends Request {
    user?: IUser;
    files?: any;
    question?: IQuestion;
    lesson?: ILesson;
    photos?: any[]; // TODO
}
