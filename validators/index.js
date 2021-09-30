const { check, validationResult } = require("express-validator");

const staffValidation = [
    check("lastName")
    .trim()
    .notEmpty()
    .withMessage("last name cannot be empty")
    .isLength({min: 2, max: 20})
    .withMessage("last name name must be 2 to 20 characters long!"),

    check("firstName")
    .trim()
    .notEmpty()
    .withMessage("first name cannot be empty")
    .isLength({min: 2, max: 20})
    .withMessage("first name must be 2 to 20 characters long!"),

    check("email")
    .trim()
    .notEmpty()
    .withMessage("Email field is required")
    .isEmail()
    .withMessage("Valid email is required"),

    check("position")
    .trim()
    .notEmpty()
    .withMessage("Position field is required")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Position field must be texts only")
    .isLength({min: 2, max: 50})
    .withMessage("position must be 2 to 20 characters long!"),

    check("department")
    .trim()
    .notEmpty()
    .withMessage("Department field is required")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Department field must be texts only")
    .isLength({min: 2, max: 50})
    .withMessage("position must be 2 to 50 characters long!"),

]

const isRequestValidated = (req, res, next) => {
    try {
      
      const errors = validationResult(req);
      if (errors.array().length > 0) {
        res.status(422).json({ error: errors.array()[0].msg });
        return;
      }
      next();
    } catch (error) {
      res.status(422).json({ error: `something is wrong ${error}` });
        return;
    }
  };

module.exports = {staffValidation, isRequestValidated}