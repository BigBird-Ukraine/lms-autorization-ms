import { NextFunction, Response } from 'express';
import * as Joi from 'joi';

import { ResponseStatusCodesEnum } from '../../constants';
import { ErrorHandler } from '../../errors';
import { ICourse, IRequestExtended } from '../../interfaces';
import { courseService } from '../../services';
import { CoursefilterParametresValidator } from '../../validators';

const courseSortingAttributes: Array<keyof ICourse> = ['_id', 'label', 'level', 'modules_list'];

class CourseController {

  async getCourses(req: IRequestExtended, res: Response, next: NextFunction) {

    const {
      limit = 20,
      offset = 0,
      sort = '_id',
      order,
      ...filter
    } = req.query;

    const filterValidity = Joi.validate(filter, CoursefilterParametresValidator);

    if (filterValidity.error) {
      return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, filterValidity.error.details[0].message));
    }

    if (!courseSortingAttributes.includes(sort)) {
      return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, 'You can\'t sort by this parameter'));
    }

    const courses = await courseService.getCourses(+limit, +offset, sort, order, filter);
    const count = courses.length;
    const pageCount = Math.ceil(count / limit);

    res.json({
      data: {
        courses,
        count,
        pageCount
      }
    });
  }

  async getCourseById(req: IRequestExtended, res: Response, next: NextFunction) {

    const {course_id} = req.params;

    const course = await courseService.getCourseByID(course_id);

    res.json({
      data: course
    });
  }
}

export const courseController = new CourseController();
