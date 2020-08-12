import { NextFunction, Response } from 'express';

import { calculationPageCount, courseSortingAttributes, regexFilterParams } from '../../helpers';
import { IRequestExtended, IUser } from '../../interfaces';
import { courseService } from '../../services';

class CourseController {

  async getCourses(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const {
        limit = 20,
        offset = 0,
        sort = '_id',
        order,
        ...filter
      } = req.query;

      courseSortingAttributes(sort);
      const updatedFilterParams = regexFilterParams(filter);

      const courses = await courseService.getCourses(+limit, +offset, sort, order, filter);
      const count = await courseService.getSizeOfAll(updatedFilterParams) as number;

      res.json({
        data: {
          courses,
          count,
          pageCount: calculationPageCount(count, limit)
        }
      });
    } catch (e) {
      next(e);
    }
  }

  async getCourseById(req: IRequestExtended, res: Response, next: NextFunction) {
    const course = req.course;

    res.json({
      data: course
    });
  }

  async getMyCourses(req: IRequestExtended, res: Response, next: NextFunction) {
    const user = req.user as IUser;

    const courses = await courseService.getMyCourses(user._id);

    res.json(courses);
  }
}

export const courseController = new CourseController();
