import * as Joi from 'joi';

export const isConfirmDataValid = Joi.object().keys({
    _id: Joi.string().trim().required(),
    address: Joi.object().keys( {
        latitude: Joi.number().required(),
        longitude: Joi.number().required()
    }),
    ip: Joi.string().trim().required()
});
