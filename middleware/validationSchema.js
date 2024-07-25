const {body} = require ("express-validator");

const validationSchema = () => {
    return [
        body("title")
            .notEmpty()
            .withMessage("title is required")
            .isLength({min:2})
            .withMessage("less than 2 char"),
        body("price")
            .notEmpty()
            .withMessage("price is required")
    ]
}

module.exports = {
    validationSchema
}