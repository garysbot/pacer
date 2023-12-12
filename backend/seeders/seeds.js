const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const Event = require('../models/Event');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');

const NUM_SEED_USERS = 100;
const NUM_SEED_EVENTS = 10;

const getRandomElement = (arr) => {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  };

const sports = [
    'Basketball', 'Soccer', 'Baseball', 'Tennis', 'Running', 'Volleyball', 'Swimming', 'Yoga', 'Gym (Fitness)',
    'Handball', 'Biking', 'Martial Arts', 'Hockey', 'Football', 'Hiking', 'Bowling', 'Water Sports', 'Ping Pong',
    'Golf', 'Pickleball', 'Rock Climbing', 'Skateboarding', 'Badminton', 'Walking', 'Lacrosse', 'Ultimate Frisbee',
    'Rugby', 'Archery', 'Fencing', 'Sailing', 'Rowing', 'Table Tennis', 'Squash', 'Equestrian',
    'CrossFit', 'Triathlons', 'Cricket', 'Jiu-Jitsu', 'Boxing'
  ];

  const eventTitles = [
    "Athletic Challenge",
    "Summer Games",
    "Fitness Expo",
    "Sports Extravaganza",
    "Active Pursuit",
    "Champion's Rally",
    "Endurance Quest",
    "Victory Showdown",
    "Athletic Spectacle",
    "Health & Wellness Festival",
    "Athletic Carnival",
    "Endurance Challenge",
    "Victory Cup",
    "Fitness Fiesta",
    "Active Quest",
    "Athletic Endeavor",
    "Sportsmanship Showcase",
    "Fitness Frenzy",
    "Wellness Summit",
    "Sports Challenge"
  ];

// Create users
const users = [];

users.push(
  new User ({
    _id: "6578a50ca44a34731bd390d2",
    email: 'demo-user@appacademy.io',
    hashedPassword: bcrypt.hashSync('password', 10),
    firstName: "Demo",
    lastName: "User",
    dateOfBirth: "2000-01-01",
    gender: "male",
    height: 60,
    weight: 200,
    primarySport: {
        Sport: "Running",
        Experience: "Beginner"
    },
    secondarySports: [
        {
            Sport: "Tennis",
            Experience: "Beginner"
        },{
            Sport: "Football",
            Experience: "Intermediate"
        },{
            Sport: "Basketball",
            Experience: "Advanced"
        }
    ],
    profilePhotoUrl: `../../../pacer-profile-pics/profile-pic-1.png`
  })
)

for (let i = 1; i < NUM_SEED_USERS; i++) {
    const generatedFirstName = faker.person.firstName();
    const generatedLastName = faker.person.lastName();
    const generatedEmail = faker.internet.email({generatedFirstName, generatedLastName});
  
    const generatedPrimarySport = getRandomElement(sports);
    let remainingSports = sports.filter(sport => sport !== generatedPrimarySport);
  
    const secondarySportsCount = faker.number.int({ min: 0, max: Math.min(5, remainingSports.length) });
  
    const secondarySports = [];
    for (let j = 0; j < secondarySportsCount; j++) {
      const selectedSport = getRandomElement(remainingSports);
      secondarySports.push({
        Sport: selectedSport,
        Experience: getRandomElement(['Beginner', 'Intermediate', 'Advanced'])
      });
      remainingSports = remainingSports.filter(sport => sport !== selectedSport);
    }
  
    // Generate a random number between 1 and 15 for the profile photo
    const profilePhotoNumber = faker.number.int({ min: 1, max: 15 });

    users.push(
      new User({
        email: generatedEmail,
        hashedPassword: bcrypt.hashSync(faker.internet.password(), 10),
        firstName: generatedFirstName,
        lastName: generatedLastName,
        dateOfBirth: faker.date.past({ years: 40 }),
        gender: getRandomElement(['male', 'female', 'other']),
        height: faker.number.int({ min: 50, max: 80 }),
        weight: faker.number.int({ min: 100, max: 300 }),
        primarySport: {
          Sport: generatedPrimarySport,
          Experience: getRandomElement(['Beginner', 'Intermediate', 'Advanced'])
        },
        secondarySports: secondarySports,
        profilePhotoUrl: `../../../pacer-profile-pics/profile-pic-${profilePhotoNumber}.png`
      })
    );
  }
  
  
// Create events
const events = [];

events.push(
  new Event({
    owner: "6578a50ca44a34731bd390d2",
    _id:"6578a6e2a2cf3cce3a0b4114",
    eventName:"test event",
    locationName:"90 5th Ave, New York, NY 10011, USA",
    description:"TEST EVENTTTTT",
    dateTime:"2023-12-30T17:30:00.000Z",
    difficulty:"Beginner",
    eventType:"Basketball",
    maxGroupSize:20,
    attendees: ["6578a50ca44a34731bd390d2"],
    maybes: [],
    longitude:-73.9937922,
    latitude:40.7362862,
  })
);

const generateRandomEvent = (usersArray) => {
  const randomUserIndex = Math.floor(Math.random() * usersArray.length);
  const randomUser = usersArray[randomUserIndex];
  const randomEventTitle = getRandomElement(eventTitles);

  const currentDate = new Date();
  const nextYear = currentDate.getFullYear() + 1;
  const randomDate = faker.date.between(currentDate, new Date(`${nextYear}-12-31`));

  const attendeesCount = faker.datatype.number({ min: 2, max: 30 });
  
  const attendees = [randomUser._id];
  for (let i = 1; i < attendeesCount; i++) {
    const randomAttendee = usersArray[Math.floor(Math.random() * usersArray.length)];
    if (!attendees.includes(randomAttendee._id)) {
      attendees.push(randomAttendee._id);
    }
  }

  const maybesCount = faker.datatype.number({ min: 0, max: Math.max(0, usersArray.length - attendeesCount) });
  const maybes = [];
  for (let i = 0; i < maybesCount; i++) {
    const randomMaybe = usersArray[Math.floor(Math.random() * usersArray.length)];
    if (!attendees.includes(randomMaybe._id) && !maybes.includes(randomMaybe._id)) {
      maybes.push(randomMaybe._id);
    }
  }

  const eventType = getRandomElement(sports);

  return new Event({
    owner: randomUser._id,
    eventName: randomEventTitle,
    eventType: eventType,
    description: `This event will focus on ${eventType}.  Join us for a fun time! ${faker.lorem.paragraph()}`,
    locationName: faker.address.streetName(),
    dateTime: randomDate,
    difficulty: getRandomElement(['Beginner', 'Intermediate', 'Advanced']),
    maxGroupSize: faker.datatype.number({ min: 2, max: 100 }),
    attendees: attendees,
    maybes: maybes,
    longitude: faker.datatype.number({ min: -74.05, max: -73.75, precision: 0.000001 }),
    latitude: faker.datatype.number({ min: 40.6, max: 40.9, precision: 0.000001 }),
  });
};

for (let i = 0; i < NUM_SEED_EVENTS; i++) {
  events.push(generateRandomEvent(users));
}


// Connect to database
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    // console.log('Connected to MongoDB successfully');
    insertSeeds();
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });

const insertSeeds = () => {
  // console.log("Resetting db and seeding users and events...");

  User.collection.drop()
                  .then(() => Event.collection.drop())
                  .then(() => User.insertMany(users))
                  .then(() => Event.insertMany(events))
                  .then(() => {
                    // console.log("Done!");
                    mongoose.disconnect();
                  })
                  .catch(err => {
                    console.error(err.stack);
                    process.exit(1);
                  });
}