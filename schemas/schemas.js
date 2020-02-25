const Joi = require('@hapi/joi');

module.exports = {
    sessionSchema: Joi.object({
        userId: Joi.string().required(),
        songQueue: Joi.array().items({
            uri: Joi.string().required(),
            title: Joi.string().required(),
            votes: Joi.number().required()
        })
    }),
    userSchema: Joi.object({ // TODO decide what all gets stored for each user
        user: Joi.object({
            userId: Joi.string().required(),
        })
    }),
    songSchema: Joi.object({ //TODO decide what all get stored for each song
        song: Joi.object({
            uri: Joi.string().required(),
            title: Joi.string().required(),
            votes: Joi.number().required()
        })
    })
};
