import * as Joi from 'joi';
import { RegExpEnum } from '../../constants/enums';

export const groupAttendanceValidator = Joi.object().keys({
  date: Joi.string().max(255).regex(RegExpEnum.date).trim().required(),
  present_students_id: Joi.array().items(Joi.string().max(255).trim()).required(),
  absent_students_id: Joi.array().items(Joi.string().max(255).trim()).required()
});
