const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Event = mongoose.model('Event')
const User = mongoose.model('User');
const { requireUser } = require('../../config/passport');
const validateEventInput = require('../../validations/events')

router.get('/', async (req, res) => {
  try {
    const eventsWithUsers = await Event.find()
      .populate({
        path: 'owner',
        select: '_id firstName lastName profilePhotoUrl', 
      })
      .populate({
        path: 'attendees',
        select: '_id firstName lastName profilePhotoUrl', 
      })
      .populate({
        path: 'maybes',
        select: '_id firstName lastName profilePhotoUrl',
      })
      .select(
        'eventName locationName description dateTime difficulty eventType maxGroupSize attendees maybes longitude latitude'
      )
      .lean(); // Convert Mongoose documents to plain JavaScript objects

    res.status(200).json(eventsWithUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const eventId = req.params.id;

    const eventWithUsers = await Event.findById(eventId)
      .populate({
        path: 'owner',
        select: '_id firstName lastName profilePhotoUrl', 
      })
      .populate({
        path: 'attendees',
        select: '_id firstName lastName profilePhotoUrl', 
      })
      .populate({
        path: 'maybes',
        select: '_id firstName lastName profilePhotoUrl', 
      })
      .select(
        'eventName locationName description dateTime difficulty eventType maxGroupSize attendees maybes longitude latitude'
      )
      .lean(); // Convert Mongoose documents to plain JavaScript objects

    if (!eventWithUsers) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json(eventWithUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/', requireUser, validateEventInput, async (req, res, next) => {
  try {
    const newEvent = new Event({
      owner: req.body.owner,
      eventName: req.body.eventName,
      description: req.body.description,
      locationName: req.body.locationName,
      dateTime: req.body.dateTime,
      difficulty: req.body.difficulty,
      eventType: req.body.eventType,
      maxGroupSize: req.body.maxGroupSize,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
      attendees: [req.body.owner],
    });

    let event = await newEvent.save();

    // Populate owner, attendees, and maybes fields
    event = await Event.populate(event, [
      { path: 'owner', select: '_id firstName lastName profilePhotoUrl' },
      { path: 'attendees', select: '_id firstName lastName profilePhotoUrl' },
      { path: 'maybes', select: '_id firstName lastName profilePhotoUrl' },
    ]);

    // Prepare the response object with the desired structure
    const responseEvent = {
      _id: event._id,
      eventName: event.eventName,
      locationName: event.locationName,
      description: event.description,
      dateTime: event.dateTime,
      difficulty: event.difficulty,
      eventType: event.eventType,
      maxGroupSize: event.maxGroupSize,
      attendees: event.attendees.map(attendee => ({
        _id: attendee._id,
        firstName: attendee.firstName,
        lastName: attendee.lastName,
        profilePhotoUrl: attendee.profilePhotoUrl,
      })),
      maybes: event.maybes.map(maybe => ({
        _id: maybe._id,
        firstName: maybe.firstName,
        lastName: maybe.lastName,
        profilePhotoUrl: maybe.profilePhotoUrl,
      })),
      longitude: event.longitude,
      latitude: event.latitude,
      owner: {
        _id: event.owner._id,
        firstName: event.owner.firstName,
        lastName: event.owner.lastName,
        profilePhotoUrl: event.owner.profilePhotoUrl,
      },
    };

    res.status(201).json(responseEvent); // Use 201 for resource creation
  } catch (err) {
    console.error(err);
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

    const updatedEventData = {
      eventName: req.body.eventName,
      description: req.body.description,
      locationName: req.body.locationName,
      dateTime: req.body.dateTime,
      difficulty: req.body.difficulty,
      eventType: req.body.eventType,
      maxGroupSize: req.body.maxGroupSize,
      longitude: req.body.longitude,
      latitude: req.body.latitude
    };

    const updatedEvent = await Event.findByIdAndUpdate(eventId, updatedEventData, {
      new: true,
      runValidators: true
    }).populate('owner', '_id firstName lastName profilePhotoUrl')
      .populate('attendees', '_id firstName lastName profilePhotoUrl')
      .populate('maybes', '_id firstName lastName profilePhotoUrl');

    // Prepare the response object with the desired structure
    const responseEvent = {
      _id: updatedEvent._id,
      eventName: updatedEvent.eventName,
      locationName: updatedEvent.locationName,
      description: updatedEvent.description,
      dateTime: updatedEvent.dateTime,
      difficulty: updatedEvent.difficulty,
      eventType: updatedEvent.eventType,
      maxGroupSize: updatedEvent.maxGroupSize,
      attendees: updatedEvent.attendees.map(attendee => ({
        _id: attendee._id,
        firstName: attendee.firstName,
        lastName: attendee.lastName,
        profilePhotoUrl: attendee.profilePhotoUrl,
      })),
      maybes: updatedEvent.maybes.map(maybe => ({
        _id: maybe._id,
        firstName: maybe.firstName,
        lastName: maybe.lastName,
        profilePhotoUrl: maybe.profilePhotoUrl,
      })),
      longitude: updatedEvent.longitude,
      latitude: updatedEvent.latitude,
      owner: {
        _id: updatedEvent.owner._id,
        firstName: updatedEvent.owner.firstName,
        lastName: updatedEvent.owner.lastName,
        profilePhotoUrl: updatedEvent.owner.profilePhotoUrl,
      },
    };

    res.json(responseEvent);
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