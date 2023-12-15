import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { difficultyBadge } from "./DiscoverPageHelpers";

export default function DiscoverPageEventContainer({ event, index }) {
  const timeConverter = (dateTime) => {
    const date = new Date(dateTime);
    const formattedDate = date.toLocaleDateString("en-US", { year: '2-digit', month: '2-digit', day: '2-digit' });
    const formattedTime = date.toLocaleTimeString("en-US", { hour: 'numeric', minute: '2-digit', hour12: true });

    return (
        <p className="date-time">{formattedDate} {formattedTime}</p>
    )
  }

  return (
    <>
      <div className="event-container">
        <div className="event-content">
          <div className="event-header">
            <Link key={index} to={`/events/${event._id}`}>
              <h3>{event.eventName}</h3>
            </Link>
            <div className="event-subheader">
                { difficultyBadge(event.difficulty, event.eventType) }
                <p className="event-subheader-difficulty">{event.difficulty}</p>
                <p className="event-subheader-host">with {`${event.owner?.firstName} ${event.owner?.lastName}`}</p>
            </div>
          </div>
          <div className="date-time-location">
            { timeConverter(event.dateTime) }
            <p>{event.locationName}</p>
            <p>{`${event.attendees.length} / ${event.maxGroupSize} Attendees`}</p>
          </div>
          <div className="event-description">
            {event.description}
          </div>
        </div>
        <div className="event-mini-map-container">
          <img
            src={`https://maps.googleapis.com/maps/api/staticmap?center=${event?.latitude},${event?.longitude}&zoom=12&size=400x400&markers=color:red%7Clabel:A%7C${event?.latitude},${event?.longitude}&key=${process.env.REACT_APP_MAPS_API_KEY}`}
            alt="map"
          />
        </div>
      </div>
    </>
  );
}