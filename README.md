![Logo](./frontend/src/icons/pacer-readme-logo.png)

## Idea
*"I hate running alone but my friends run way too fast. I wish I had my own personal Pacer..."*
<br><br>
In the world of running *pacers* play a crucial role by setting a consistent speed to help runners achieve their target times in a race.
<br><br>
The *Pacer* platform helps you connect with people playing your favorite sport at similar performance levels so you can train, bond, and celebrate together.
<br><br>
👉
[Live Demo](https://pacer-65mk.onrender.com/)
👈
<br>

## Features
1. User Auth
2. Events (CRUD) w/ Interactive Google Map
3. Google Maps API Integration (Dynamic Map, Static Map, & Places API)
4. User Profiles
5. Discover Events Page
6. Event Social Stats
7. Event Comments (CRUD)
<br>


## Plan
1. Audience Value Props
![Audience-Value-Props](./frontend/src/readme-imgs/audience-value-props.png)
<br><br>

2. App Architecture & Data Flow
![Data-Architecture-Flow](./frontend/src/readme-imgs/data-architecture.png)

3. Design
![Design-1-Discover](./frontend/src/readme-imgs/design-1-discover.png)
![Design-2-EventShow](./frontend/src/readme-imgs/design-2-event-show.png)


## Tech Stack
- MongoDB
- ExpressJS
- React.js
- Node.js
<br>

## Notable Highlights
![User-Auth](./frontend/src/icons/user-auth-login.gif)
![User-Auth-Sign-Up](./frontend/src/icons/pacer-sign-up-modal.gif)
<br>*User Authentication Modals*<br>


![Sports-Ranking](./frontend/src/icons/sports-feature.gif)
<br>*Event Filter*<br>


![Google-Map](./frontend/src/icons/google-map.gif)
<br>*Google Maps API Integration*<br>
<br>


## Implementation
### Data Architecture with Mongoose & MongoDB

Mongoose Models: `Events`, `Users`, `Comments`
```javascript
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  body: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Comment', commentSchema);

```
<br>

Validations to ensure data integrity:
```javascript
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
        ...
```
<br>

Dynamic Interactive Google Map:
- Integrated three Google Maps API endpoints:
1. Dynamic interactive map on `Events` page.
2. Static map preview on `Discover` page.
3. Places API autocomplete search results when selecting an `Event` location.

![Places-Autocomplete](./frontend/src/icons/places-autocomplete.gif)

```javascript
<GoogleMap
  mapContainerStyle={mapStyles}
  zoom={14}
  center={{
    lat: selectedEvent?.latitude,
    lng: selectedEvent?.longitude,
  }}
>
  <Marker 
    position={{
    lat: selectedEvent?.latitude,
    lng: selectedEvent?.longitude,
    }}
    onClick={handleMarkerClick}
  />
  {infoWindowVisible && (
    <InfoWindow
      position={{
        lat: selectedEvent?.latitude,
        lng: selectedEvent?.longitude,
      }}
      onCloseClick={() => setInfoWindowVisible(false)}
    >
      <div>
        <p>Location: {selectedEvent?.locationName}</p>
        <p>Time of Event: {formattedTime}</p>
      </div>
    </InfoWindow>
  )}
</GoogleMap>
```


### Routing with Express.js
- Three RESTful Express routes for `Users`, `Events`, `Comments`
- Full CRUD for `Events` and `Comments`

```javascript
    
router.post('/', requireUser, validateCommentInput, async (req, res, next) => {
  try {
    const newComment = new Comment({
      owner: req.body.owner,
      event: req.body.event,
      body: req.body.body
    });

    let comment = await newComment.save();

    comment = await Comment.findById(comment._id)
      .populate('owner', '_id firstName lastName profilePhotoUrl')
      .populate('event', '_id eventName locationName dateTime difficulty eventType maxGroupSize longitude latitude');

    return res.json(comment);
  } catch (err) {
    next(err);
  }
}); 
```

### Main React.js Components
- `Discover` Page:
  - Primary user interface with comprehensive `Event` filtering feature.
  - Displays all `Events` available for `Users`.
  - `Event POST` feature to create new `Events`.
  - Session and `User` validation required to create new `Events`.

- `Event` Page 
  - Displays `Event` details from Redux state.
  - Attending & Interested buttons with integration to update Redux and MongoDB.
  - `Comments POST` feature to create new `Comments`.

### State Management with Redux
- Redux implemented for state management enhancing UI load times and reducing unnecessary API calls.
- Redux slices of state for `Users`, `Events`, `Comments`.
- `Events` reducer:
```javascript
const eventsReducer = (state = { all: {}, user: {}, new: undefined }, action) => {
  switch (action.type) {
    case RECEIVE_EVENTS:
      const allEventsArray = action.events;

      const allEventsObject = allEventsArray.reduce((accumulator, event) => {
        accumulator[event._id] = event;
        return accumulator;
      }, {});

      return { ...state, all: allEventsObject, new: undefined };
    case RECEIVE_NEW_EVENT:
      return { ...state, all: { ...state.all, [action.event._id]: action.event }, new: undefined };
    case UPDATE_EVENT:
      return { ...state, all: { ...state.all, [action.event._id]: action.event }, new: undefined };
    case DELETE_EVENT:
      const { [action.eventId]: deletedEvent, ...rest } = state.all;
      return { ...state, all: rest, new: undefined };
    case RECEIVE_EVENT:
      return { ...state, all: { ...state.all, [action.event._id]: action.event }, new: undefined };
    case RECEIVE_USER_LOGOUT:
      return { ...state, user: {}, new: undefined }
    default:
      return state;
  }
};
```

<br><br>

## Challenges
1. New tech stack & three days to learn it
  - Mainly learning how to use Express.js for backend routes and Mongoose/MongoDB for models and storage within a weekend
2. Google Maps and parsing location data
  - Integrating three sub-API queries (dynamic map, static map and places api autocomplete) and integrating into react components
3. Handling bugs
  - Finding bugs sometimes was difficult but overall, gave us a chance to understand the entire stack more by tracing the bug from the through the whole stack, especially since one request could have multiple bugs along the way, with developers working on different parts of the application at the same time. To trace all the bugs, we would check our backend logs and our frontend console logs for errors, and then check the middle which could've been problems with our reducers or our thunk actions for instance. Doing this multiple times gave us a better idea of how to find our bugs in a fullstack application fairly quickly.
4. Going from a SQL database (structured tables) to a NoSQL database (document-based)
5. Learning to work together as a team and splitting workload

<br><br>

## Team
### Gary Jiang
*Team & Frontend Lead*<br>
[Github](https://github.com/garysbot)<br>
[Website](https://imgaryjiang.com)<br>
[LinkedIn](https://linkedin.com/in/garyjiang)<br>

### Jason Jun
*Flex Lead*<br>
[Github](https://github.com/junjason)<br>
[Website](https://www.junjason.com)<br>
[LinkedIn](https://www.linkedin.com/in/jason-jun-0a7576237/)<br>

### Francis Cawog
*Backend Lead*<br>
[Github](https://github.com/garysbot)<br>
[Website](https://imgaryjiang.com)<br>
[LinkedIn](https://linkedin.com/in/garyjiang)<br>

### Robert Lee
*Flex*<br>
[Github](https://github.com/garysbot)<br>
[Website](https://imgaryjiang.com)<br>
[LinkedIn](https://linkedin.com/in/garyjiang)<br>

