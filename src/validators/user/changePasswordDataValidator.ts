import * as Joi from 'joi';

import { RegExpEnum } from '../../constants';

export const changePasswordDataValidator = Joi.object().keys({
  new_password: Joi.string().max(255).regex(RegExpEnum.password).min(8).trim().required(),
  password: Joi.string().max(255).regex(RegExpEnum.password).min(8).trim().required()
}).min(1);
