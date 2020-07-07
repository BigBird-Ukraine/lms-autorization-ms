import * as Joi from 'joi';

export const userIdValidator = Joi.object().keys({
    user_id: Joi.number().integer().required()
});
