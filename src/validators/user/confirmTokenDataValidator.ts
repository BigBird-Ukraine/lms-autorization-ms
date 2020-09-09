import * as Joi from 'joi';

export const confirmTokenDataValidator = Joi.object().keys({
  confirmToken: Joi.string().trim().required()
}).min(1);
