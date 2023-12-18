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
- Events, Users, Comments
  - Schemas
  - Models
    - Three different models: events, users, and comments. Comments are the most compact model and is shown below. 
    ![Comment-Model](./frontend/src/readme-imgs/comments-model.png)
  - Validations
     - Used in our post routes before creating an object in our database
- Google Maps API
- ![Dynamic-Map](./frontend/src/readme-imgs/dynamic-map.png)
- We integrated/hit three different Google Maps API endpoints for this project: a dynamic map on the events show page (as shown above), a static map for each event preview in the discover page and a places API autocomplete for creating and editing an event (queries the API with a string and returns possible locations - similar to how the Google Maps Application search bar works).
- ![Places-Autocomplete](./frontend/src/icons/places-autocomplete.gif)

### Routing with Express.js
- Users
- Events
- Comments
- ![Comments-Post-Route](./frontend/src/readme-imgs/comments-post-route.png)
- Both Events and Comments were full CRUD (Create, Read, Update, and Delete). We followed RESTful API practices for our backend routes. 

### Main React.js Components
- Events Page
- Discover Page
 - Most of the logic for our Discover page component was creating an event at the top of the page, which triggers a sign-in if not logged in, a filtering logic based on both difficulty of the event and the sport for the event. A useEffect hook was used every time the useState variables for our filters were changed and the component would update and re-render.

### State Management with Redux
- Events
- ![Events-Reducer](./frontend/src/readme-imgs/events-reducer.png)
- Users
- Comments
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

