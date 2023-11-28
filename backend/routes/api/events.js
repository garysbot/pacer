const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Event = mongoose.model('Event')
const { requireUser } = require('../../config/passport');
const validateEventInput = require('../../validations/events')

router.get('/', async (req, res) => {
  try {
    const eventsWithUsers = await Event.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'owner',
          foreignField: '_id',
          as: 'ownerDetails',
        },
      },
      {
        $unwind: '$ownerDetails',
      },
      {
        $lookup: {
          from: 'users',
          let: { attendees: '$attendees' },
          pipeline: [
            {
              $match: {
                $expr: { $in: ['$_id', '$$attendees'] },
              },
            },
          ],
          as: 'attendeesDetails',
        },
      },
      {
        $lookup: {
          from: 'users',
          let: { maybes: '$maybes' },
          pipeline: [
            {
              $match: {
                $expr: { $in: ['$_id', '$$maybes'] },
              },
            },
          ],
          as: 'maybesDetails',
        },
      },
      {
        $project: {
          eventName: 1,
          locationName: 1,
          description: 1,
          dateTime: 1,
          difficulty: 1,
          eventType: 1,
          maxGroupSize: 1,
          attendees: 1,
          maybes: 1,
          longitude: 1,
          latitude: 1,
          eventPrivacy: 1,
          ownerDetails: {
            _id: '$ownerDetails._id',
            firstName: '$ownerDetails.firstName',
            lastName: '$ownerDetails.lastName',
            // Add other owner details as needed
          },
          attendeesDetails: {
            $map: {
              input: '$attendeesDetails',
              as: 'attendee',
              in: {
                _id: '$$attendee._id',
                firstName: '$$attendee.firstName',
                lastName: '$$attendee.lastName',
                // Add other attendee details as needed
              },
            },
          },
          maybesDetails: {
            $map: {
              input: '$maybesDetails',
              as: 'maybe',
              in: {
                _id: '$$maybe._id',
                firstName: '$$maybe.firstName',
                lastName: '$$maybe.lastName',
                // Add other maybe details as needed
              },
            },
          },
        },
      },
    ]);

    res.status(200).json(eventsWithUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const eventId = req.params.id;

    const eventWithUsers = await Event.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(eventId),
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'owner',
          foreignField: '_id',
          as: 'ownerDetails',
        },
      },
      {
        $unwind: '$ownerDetails',
      },
      {
        $lookup: {
          from: 'users',
          let: { attendees: '$attendees' },
          pipeline: [
            {
              $match: {
                $expr: { $in: ['$_id', '$$attendees'] },
              },
            },
            {
              $group: {
                _id: '$_id',
                attendees: { $push: '$$ROOT' },
              },
            },
          ],
          as: 'attendeesDetails',
        },
      },
      {
        $unwind: '$attendeesDetails',
      },
      {
        $lookup: {
          from: 'users',
          let: { maybes: '$maybes' },
          pipeline: [
            {
              $match: {
                $expr: { $in: ['$_id', '$$maybes'] },
              },
            },
            {
              $group: {
                _id: '$_id',
                maybes: { $push: '$$ROOT' },
              },
            },
          ],
          as: 'maybesDetails',
        },
      },
      {
        $unwind: '$maybesDetails',
      },
      {
        $project: {
          eventName: 1,
          locationName: 1,
          description: 1,
          dateTime: 1,
          difficulty: 1,
          eventType: 1,
          maxGroupSize: 1,
          attendees: '$attendeesDetails.attendees',
          maybes: '$maybesDetails.maybes',
          longitude: 1,
          latitude: 1,
          eventPrivacy: 1,
          ownerDetails: {
            _id: '$ownerDetails._id',
            firstName: '$ownerDetails.firstName',
            lastName: '$ownerDetails.lastName',
            // Add other owner details as needed
          },
        },
      },
    ]);

    if (eventWithUsers.length === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json(eventWithUsers[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
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