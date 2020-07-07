import * as Joi from 'joi';

export const lessonIdValidator = Joi.object().keys({
    lesson_id: Joi.number().integer().required()
});
