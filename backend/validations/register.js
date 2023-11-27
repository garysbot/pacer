const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validateRegisterInput = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Email is invalid'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 8, max: 30 })
    .withMessage('Password must be between 8 and 30 characters'),
  check('firstName')
    .exists({ checkFalsy: true })
    .isLength({ min: 1, max: 30 })
    .withMessage('First Name must be between 1 and 30 characters'),
  check('lastName')
    .exists({ checkFalsy: true })
    .isLength({ min: 1, max: 30 })
    .withMessage('Last Name must be between 1 and 30 characters'),
  check('dateOfBirth')
    .exists({ checkFalsy: true })
    .withMessage('Date of Birth must be selected'),
  check('gender')
    .exists({ checkFalsy: true })
    .withMessage('Please select a gender'),
  check('primarySport')
    .exists({ checkFalsy: true })
    .withMessage('Must select a Primary Sport'),
    
  handleValidationErrors
];

module.exports = validateRegisterInput;