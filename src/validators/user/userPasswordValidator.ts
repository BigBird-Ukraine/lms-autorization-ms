import * as Joi from 'joi';

import { RegExpEnum } from '../../constants/enums';

export const userPasswordValidator = Joi.object().keys({
  password: Joi.string().max(255).regex(RegExpEnum.password).min(8).trim().required()
});
