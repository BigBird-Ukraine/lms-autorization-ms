import { NextFunction, Response } from 'express';
import { calculationPageCount, courseSortingAttributes } from '../../helpers';
import { IRequestExtended } from '../../interfaces';
import { courseService } from '../../services';

class CourseController {

    async getCourses(req: IRequestExtended, res: Response, next: NextFunction) {

        const {limit = 20,
            offset = 0,
            sort = '_id',
            order,
            ...filter
        } = req.query;

        courseSortingAttributes(sort, next);

        const courses = await courseService.getCourses(+limit, +offset, sort, order, filter);

        res.json({
            data: {
                courses,
                count: courses.length,
                pageCount: calculationPageCount(courses.length, limit)
            }
        });
    }

    async getCourseById(req: IRequestExtended, res: Response, next: NextFunction) {
        const course = req.course;

        res.json({
            data: course
        });
    }
}

export const courseController = new CourseController();
