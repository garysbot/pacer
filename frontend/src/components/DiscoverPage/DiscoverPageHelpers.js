export const difficultyBadge = (difficulty, eventType) => {
  switch (difficulty) {
    case 'Beginner':
      return (
        <p className="sport-icon beginner">{sportIcon(eventType)}</p>
      )
    case 'Intermediate':
      return (
        <p className="sport-icon intermediate">{sportIcon(eventType)}</p>
      )
    case 'Advanced':
      return (
        <p className="sport-icon advanced">{sportIcon(eventType)}</p>
      )
    default:
      return null
  }
}

const sportIcon = (eventType) => {
  switch (eventType) {
    case 'Basketball':
      return "🏀";
    case 'Soccer':
      return "⚽";
    case 'Baseball':
      return "⚾";
    case 'Tennis':
      return "🎾";
    case 'Running':
      return "🏃‍♂️";
    case 'Volleyball':
      return "🏐";
    case 'Swimming':
      return "🏊‍♂️";
    case 'Yoga':
      return "🧘";
    case 'Gym (Fitness)':
      return "🏋️";
    case 'Handball':
      return "🤾";
    case 'Biking':
      return "🚴";
    case 'Martial Arts':
      return "🥋";
    case 'Hockey':
      return "🏒";
    case 'Football':
      return "🏈";
    case 'Hiking':
      return "🥾";
    case 'Bowling':
      return "🎳";
    case 'Water Sports':
      return "🏄";
    case 'Ping Pong':
      return "🏓";
    case 'Golf':
      return "⛳";
    case 'Pickleball':
      return "🏓";
    case 'Rock Climbing':
      return "🧗";
    case 'Skateboarding':
      return "🛹";
    case 'Badminton':
      return "🏸";
    case 'Walking':
      return "🚶";
    case 'Lacrosse':
      return "🥍";
    case 'Ultimate Frisbee':
      return "🥏";
    case 'Rugby':
      return "🏉";
    case 'Archery':
      return "🏹";
    case 'Fencing':
      return "🤺";
    case 'Sailing':
      return "⛵";
    case 'Rowing':
      return "🚣";
    case 'Table Tennis':
      return "🏓";
    case 'Squash':
      return "🧃";
    case 'Equestrian':
      return "🐎";
    case 'CrossFit':
      return "🏋️‍♂️";
    case 'Triathlons':
      return "🏊‍♂️";
    case 'Cricket':
      return "🏏";
    case 'Jiu-Jitsu':
      return "🥋";
    case 'Boxing':
      return "🥊";
    default:
      return ""; // Return an empty string or a default icon if eventType does not match
  }
};