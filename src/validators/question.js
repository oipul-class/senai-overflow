const { celebrate, Joi, Segments } = require("celebrate");

module.exports = {
    create: celebrate({
        [Segments.BODY]: Joi.object().keys({
            title: Joi.string().min(1).max(255).required(),
            description: Joi.string().max(255).required(),
            categories: Joi.string().required(),
            gist: Joi.string().max(255)
        }) 
    })
}
