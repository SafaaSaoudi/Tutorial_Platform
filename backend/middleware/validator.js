const {validationResult,body}=require('express-validator')

    exports.loginvalidation = [
    body("email", "are you sure you are registred? enter a valid email").isEmail(),
    body("password", "password not valid , at least 6 caracters").isLength({ min: 6 }),
    ];
    exports.validation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
    }
    next();
    };