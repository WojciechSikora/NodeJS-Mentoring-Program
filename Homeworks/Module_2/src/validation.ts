import * as joi from '@hapi/joi';

export const UserSchema = joi.object({
    login: joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    password: joi.string()
        .pattern(new RegExp('^(?=.*\\d)(?=.*[a-zA-Z]).{8,24}$'))
        .required(),
    age: joi.number()
        .integer()
        .min(4)
        .max(130)
        .required()
});
