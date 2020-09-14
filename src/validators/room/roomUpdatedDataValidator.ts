import * as Joi from 'joi';

export const roomUpdatedDataValidator = Joi.object().keys({
  label: Joi.string().max(255).trim(),
  count_all_places: Joi.number().integer().max(100),
  free_places: Joi.number().integer().max(100),
  start_at: Joi.date(),
  close_at: Joi.date(),
  groups: Joi.array().items(Joi.string().trim()),
  booked_users: Joi.array().items({
    id: Joi.string().trim().required(),
    rent_start: Joi.date().required(),
    rent_end: Joi.date().required()
  }),
  date: Joi.date()
});
