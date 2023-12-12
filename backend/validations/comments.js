const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validateCommentInput = [
    check('owner')
        .exists({ checkFalsy: true })
        .withMessage('User must be logged in to create an event'),
    check('event')
        .exists({ checkFalsy: true })
        .withMessage('Event must be selected to create a comment'),
    check('body')
        .exists({ checkFalsy: true })
        .isLength({ min: 5, max: 1000 })
        .withMessage('Comment must have a body between 5 and 1000 characters'),
    handleValidationErrors
];

module.exports = validateCommentInput;