import * as Joi from 'joi';

export const questionIdValidator = Joi.object().keys({
    question_id: Joi.number().integer().required()
});
