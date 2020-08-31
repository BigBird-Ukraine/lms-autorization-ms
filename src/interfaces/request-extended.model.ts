import { Request } from 'express-serve-static-core';
import { IComment } from './comment.model';
import { ICourse } from './course.model';
import { IGroup } from './group.model';
import { ILesson } from './lesson.model';
import { IModule } from './module.model';

import { IQuestion } from './question.model';
import { IPassedTest } from './test_result.model';
import { IUser } from './user.model';

export interface IRequestExtended extends Request {
    user?: IUser;
    comment?: IComment;
    files?: any;
    question?: IQuestion;
    lesson?: ILesson;
    photos?: any[]; // TODO
    passed_test?: IPassedTest;
    group?: IGroup;
    course?: ICourse;
    module?: IModule;
    refresh_token?: any;
    passed_lesson_id?: string;
}
