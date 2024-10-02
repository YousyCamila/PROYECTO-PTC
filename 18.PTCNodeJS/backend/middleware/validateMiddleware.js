const { body, validationResult } = require('express-validator');

const validateUser = [
    body('email').isEmail(),
    body('name').notEmpty(),
    body('password').isLength({ min: 6 }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateUser };
