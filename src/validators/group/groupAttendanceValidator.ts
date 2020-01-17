import * as Joi from 'joi';

export const groupAttendanceValidator = Joi.object().keys({
  date: Joi.date(),
  present_students_id: Joi.array().items(Joi.string().max(255).trim()),
  absent_students_id: Joi.array().items(Joi.string().max(255).trim())
});
