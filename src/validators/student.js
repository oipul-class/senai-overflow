const { celebrate, Joi, Segments } = require("celebrate");

module.exports = {
    create: celebrate({
        [Segments.BODY]: Joi.object().keys({ //validando o body
            ra: Joi.string().length(7).pattern(/^[0-9]+$/).required(),
            name: Joi.string().min(3).max(255).required(),
            email: Joi.string().min(8).max(255).email().required(),
            password: Joi.string().min(8).max(255).required()
        }) 
    })
}
