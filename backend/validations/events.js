const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

// validateTweetInput is a combination Express middleware that uses the `check`
// middleware to validate the keys in the body of a request to create/edit
// a tweet
const validateEventInput = [
    check('owner')
        .exists({ checkFalsy: true })
        .isLength({ min: 5, max: 140 })
        .withMessage('Tweet must be between 5 and 140 characters'),
    check('eventName')
        .exists({ checkFalsy: true })
        .withMessage('Event must have a name'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Event must have a description'),
    check('locationName')
        .exists({ checkFalsy: true })
        .withMessage('Event has to happen somewhere, right?'),
    check('dateTime')
        .exists({ checkFalsy: true })
        .withMessage('Event has to happen sometime, right?'),
    check('type')
        .exists({ checkFalsy: true })
        .withMessage('Event has to have a type'),
        
  handleValidationErrors
];

module.exports = validateEventInput;