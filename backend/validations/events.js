const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const allowedEventTypes = [
    'Basketball', 'Soccer', 'Baseball', 'Tennis', 'Running', 'Volleyball', 'Swimming', 'Yoga', 'Gym (Fitness)',
    'Handball', 'Biking', 'Martial Arts', 'Hockey', 'Football', 'Hiking', 'Bowling', 'Water Sports', 'Ping Pong',
    'Golf', 'Pickleball', 'Rock Climbing', 'Skateboarding', 'Badminton', 'Walking', 'Lacrosse', 'Ultimate Frisbee',
    'Rugby', 'Archery', 'Fencing', 'Sailing', 'Rowing', 'Table Tennis', 'Squash', 'Equestrian sports (horseback riding)',
    'CrossFit (fitness activity/sport)', 'Triathlons', 'Cricket', 'Jiu-Jitsu', 'Boxing'
  ];

const validateEventInput = [
    check('owner')
        .exists({ checkFalsy: true })
        .withMessage('User must be logged in to create an event'),
    check('eventName')
        .exists({ checkFalsy: true })
        .isLength({ min: 5, max: 100 })
        .withMessage('Event must have a name between 5 and 100 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .isLength({ min: 5, max: 1000 })
        .withMessage('Event must have a description between 5 and 1000 characters'),
    check('locationName')
        .exists({ checkFalsy: true })
        .withMessage('Event location must have a name'),
    check('dateTime')
        .exists({ checkFalsy: true })
        .withMessage('Event has to happen sometime, right?')
        .isAfter(new Date().toISOString())
        .withMessage('Event date must be in the future'),
    check('difficulty')
        .exists({ checkFalsy: true })
        .isIn("Beginner, Intermediate, Advanced")
        .withMessage('Event must have a difficulty level'),
    check('eventType')
        .exists({ checkFalsy: true })
        .withMessage('Event must have a type')
        .isIn(allowedEventTypes)
        .withMessage('Invalid event type. Must be one of the specified event types'),
    check('maxGroupSize')
        .exists({ checkFalsy: true })
        .withMessage('Please select a maximum group size')
        .isInt({ min: 1 })
        .withMessage('Max group size must be a positive integer'),
    // check('eventPrivacy')
    //     .exists({ checkFalsy: true })
    //     .isBoolean(),


    // check('longitude')
    //     .exists({ checkFalsy: true })
    //     .withMessage('Longitude is required')
    //     .isFloat({ min: -180, max: 180 })
    //     .withMessage('Longitude must be a valid number between -180 and 180'),
    // check('latitude')
    //     .exists({ checkFalsy: true })
    //     .withMessage('Latitude is required')
    //     .isFloat({ min: -90, max: 90 })
    //     .withMessage('Latitude must be a valid number between -90 and 90'),
    
  handleValidationErrors
];

module.exports = validateEventInput;