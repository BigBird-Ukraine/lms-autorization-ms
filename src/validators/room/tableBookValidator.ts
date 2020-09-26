import * as Joi from 'joi';

export const tableBookValidator = Joi.object().keys({
    user_id: Joi.string().trim().required(),
    table_number: Joi.string().trim().required(),
    rent_start: Joi.date().required(),
    rent_end: Joi.date().required()
});
