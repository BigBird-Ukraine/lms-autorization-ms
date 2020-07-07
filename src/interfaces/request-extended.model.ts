import { Request } from 'express-serve-static-core';
import { ICourse } from './course.model';
import { IGroup } from './group.model';
import { ILesson } from './lesson.model';
import { IModule } from './module.model';

import { IQuestion } from './question.model';
import { ITestResultModel } from './test_result.model';
import { IUser } from './user.model';

export interface IRequestExtended extends Request {
    user?: IUser;
    files?: any;
    question?: IQuestion;
    lesson?: ILesson;
    photos?: any[]; // TODO
    passed_test?: ITestResultModel;
    group?: IGroup;
    course?: ICourse;
    module?: IModule;
}
