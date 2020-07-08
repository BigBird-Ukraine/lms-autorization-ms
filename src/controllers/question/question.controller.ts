import {NextFunction, Request, Response} from 'express';
import {ResponseStatusCodesEnum} from '../../constants';
import {checkAdminRole, questionSortingAttributes, calculationPageCount, regexFilterParams} from '../../helpers';
import {IRequestExtended, IUser} from '../../interfaces';
import {questionService} from '../../services';

class QuestionController {

    async getQuestions(req: Request, res: Response, next: NextFunction) {
        try {
            const {
                limit = 20,
                offset = 0,
                sort = '_id',
                order,
                ...filter
            } = req.query;

            questionSortingAttributes(sort);
            const updatedFilterParams = regexFilterParams(filter);

            const questions = await questionService.getQuestions(+limit, +offset, sort, order, filter);
            const count = await questionService.getSizeOfAll(updatedFilterParams) as number;

            res.json({
                data: {
                    questions,
                    count: count,
                    pageCount: calculationPageCount(count, limit)
                }
            });
        } catch (e) {
            next(e)
        }
    }

    async createQuestion(req: IRequestExtended, res: Response, next: NextFunction) {
        const questionValue = req.body;
        const {_id, role_id} = req.user as IUser;

        checkAdminRole(role_id, next);

        await questionService.createQuestion({...questionValue, user_id: _id});

        res.status(ResponseStatusCodesEnum.CREATED).end();
    }

    async getMyQuestions(req: IRequestExtended, res: Response, next: NextFunction) {
        const {_id} = req.user as IUser;
        const {limit = 20, offset = 20} = req.query;

        const questions = await questionService.getMyQuestion(_id, +limit, +offset);

        res.json({
            data: {
                questions,
                count: questions.length,
                pageCount: calculationPageCount(questions.length, limit)
            }
        });
    }

    async deleteQuestion(req: IRequestExtended, res: Response, next: NextFunction) {
        const {question_id} = req.params;

        await questionService.deleteQuestionById(question_id);

        res.end();
    }
}

export const questionController = new QuestionController();
