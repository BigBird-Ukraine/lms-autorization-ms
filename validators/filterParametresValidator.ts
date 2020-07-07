import * as Joi from 'joi';

export const filterParametresValidator = Joi.object().keys({
    level: Joi.alternatives().try([Joi.string().max(255).trim(), Joi.number()]),
    subject: Joi.alternatives().try([Joi.string().max(255).trim(), Joi.number()]),
    group: Joi.alternatives().try([Joi.string().max(255).trim(), Joi.number()]),
    tags: Joi.alternatives().try([Joi.string().max(255).trim(), Joi.number()])
});
