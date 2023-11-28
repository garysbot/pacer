const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Event = mongoose.model('Event')
const { requireUser } = require('../../config/passport');
const validateEventInput = require('../../validations/events')

router.get('/', async (req, res) => {
  try {
    const events = await Event.find()
                              .populate("owner", "_id username")
                              .sort({ createdAt: -1 });
    return res.json(events);
  }
  catch(err) {
    return res.json([]);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id)
                             .populate("owner", "_id username");
    return res.json(event);
  }
  catch(err) {
    const error = new Error('Tweet not found');
    error.statusCode = 404;
    error.errors = { message: "No tweet found with that id" };
    return next(error);
  }
});

router.post('/', requireUser, validateEventInput, async (req, res, next) => {
  try {
    const newEvent = new Event({
      owner: req.body.owner,
      eventName: req.body.eventName,
      locationName: req.body.locationName,
      description: req.body.description,
      dateTime: req.body.dateTime,
      type: req.body.type,
      difficulty: "easy",
      maxGroupSize: req.body.maxGroupSize,
      attending: [],
      longitude: 0,
      latitude: 0
    });

    let event = await newEvent.save();
    event = await event.populate('owner', '_id username');
    return res.json(event);
  }
  catch(err) {
    next(err);
  }
});

module.exports = router;