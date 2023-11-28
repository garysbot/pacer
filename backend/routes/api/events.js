const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Event = mongoose.model('Event')
const { requireUser } = require('../../config/passport');
const validateEventInput = require('../../validations/events')

router.get('/', async (req, res) => {
  try {
    const events = await Event.find()
                              .populate("owner", "_id")
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
                             .populate("owner", "_id");
    return res.json(event);
  }
  catch(err) {
    const error = new Error('Event not found');
    error.statusCode = 404;
    error.errors = { message: "No event found with that id" };
    return next(error);
  }
});

router.post('/', requireUser, validateEventInput, async (req, res, next) => {
  try {
    const newEvent = new Event({
      owner: req.user._id,
      eventName: req.body.eventName,
      description: req.body.description,
      locationName: req.body.locationName,
      dateTime: req.body.dateTime,
      difficulty: req.body.difficulty,
      eventType: req.body.eventType,
      maxGroupSize: req.body.maxGroupSize,
      eventPrivacy: req.body.eventPrivacy || false,
      longitude: req.body.longitude,
      latitude: req.body.latitude
    });

    let event = await newEvent.save();
    event = await event.populate('owner', '_id');
    return res.json(event);
  }
  catch(err) {
    next(err);
  }
});

router.patch('/:id', requireUser, validateEventInput, async (req, res, next) => {
  try {
    const eventId = req.params.id;
    const userId = req.user._id;

    const event = await Event.findById(eventId);

    if (!event) {
      const error = new Error('Event not found');
      error.statusCode = 404;
      throw error;
    }

    if (event.owner.toString() !== userId.toString()) {
      const error = new Error('Unauthorized');
      error.statusCode = 401; 
      throw error;
    }

    const updatedEventData = {
      eventName: req.body.eventName,
      description: req.body.description,
      locationName: req.body.locationName,
      dateTime: req.body.dateTime,
      difficulty: req.body.difficulty,
      eventType: req.body.eventType,
      maxGroupSize: req.body.maxGroupSize,
      eventPrivacy: req.body.eventPrivacy || false,
      longitude: req.body.lng,
      latitude: req.body.lat
    };

    const updatedEvent = await Event.findByIdAndUpdate(eventId, updatedEventData, {
      new: true,
      runValidators: true
    }).populate('owner', '_id');

    if (!updatedEvent) {
      const error = new Error('Event not found');
      error.statusCode = 404;
      throw error;
    }

    return res.json(updatedEvent);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', requireUser, async (req, res, next) => {
  try {
    const eventId = req.params.id;
    const userId = req.user._id;

    const event = await Event.findById(eventId);

    if (!event) {
      const error = new Error('Event not found');
      error.statusCode = 404;
      throw error;
    }

    if (event.owner.toString() !== userId.toString()) {
      const error = new Error('Unauthorized');
      error.statusCode = 401;
      throw error;
    }

    const deletedEvent = await Event.findByIdAndDelete(eventId);

    if (!deletedEvent) {
      const error = new Error('Event not found');
      error.statusCode = 404;
      throw error;
    }

    return res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;