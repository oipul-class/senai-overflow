const { celebrate, Joi, Segments } = require("celebrate");

module.exports = {
    index: celebrate({
        [Segments.QUERY]: Joi.object().keys({
            searchParams: Joi.string().min(4).max(255).required(),
        }) 
    }),

    create: celebrate({
        [Segments.BODY]: Joi.object().keys({
            title: Joi.string().min(5).max(255).required(),
            description: Joi.string().max(255).required(),
            categories: Joi.string().required(),
            gist: Joi.string().max(255)
        }) 
    })
}
