const { celebrate, Joi, Segments } = require("celebrate");

module.exports = {
    create: celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().integer().required()
        }),

        [Segments.BODY]: Joi.object().keys({
            answer: Joi.string().min(10).required(),
        })
    })
}
