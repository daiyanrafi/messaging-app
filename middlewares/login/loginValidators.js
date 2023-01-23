const { check, validationResult } = require("express-validator");

const doLoginValidators = [
  //require check
  check("username")
    .isLength({
      min: 1,
    })
    .withMessage("mobile or email required"),
  check("password").isLength({ min: 1 }).withMessage("Password needed"),
];

//after validation if error happend to catch that error its a another middleware
const doLoginValidationHandler = function (req, res, next) {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();
    if (Object.keys(mappedErrors).length === 0) {
        next();
    } else {
        //res template local
        res.render("index", {
            data: {
                username: req.body.username,
            },
            errors: mappedErrors,
        });
    }
};

module.exports = {
  doLoginValidators,
  doLoginValidationHandler,
};
