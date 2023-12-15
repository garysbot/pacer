import { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function AttendeeDropdowns({ selectedEvent }) {
  const [showAttendees, setShowAttendees] = useState(true);

  const handleArrowToggle = () => {
    setShowAttendees(!showAttendees);
  };

  const attendeesCount = selectedEvent?.attendees?.length;

  if (attendeesCount > 4) {
    if (showAttendees) {
      return (
        <>
        <div className="attending-container">
          <p>{attendeesCount} Attending 
            <span
              className="dropdown-arrow" 
              onClick={handleArrowToggle} 
              style={{ cursor: 'pointer' }}
              >
                {showAttendees ? ' \u25B6' : ' \u25BC'}
            </span> </p>
            <div 
              className="attendees-list" 
              style={{ 
                display: showAttendees ? "block" : "none" 
                }}
              >
              {
                selectedEvent?.attendees?.slice(0, 4).map((attendee, index) => (
                  <Link to={`/users/${attendee._id}`} key={index} className="attendee-circle" data-name={`${attendee.firstName} ${attendee.lastName}`}>
                    <img src={`../../${attendee.profilePhotoUrl}`} alt={`${attendee.firstName}'s Profile`} />
                  </Link>
                ))
              }
            </div>
          </div>
        </>
      );
    } else {
      const chunks = [];
      for (let i = 0; i < attendeesCount; i += 4) {
        chunks.push(selectedEvent?.attendees.slice(i, i + 4));
      }

      return (
        <>
        <div className="attending-container">
          <p>{attendeesCount} Attending 
          <span className='dropdown-arrow' onClick={handleArrowToggle} style={{ cursor: 'pointer' }}>&#9660;</span></p>
            <div className="attendees-list">
              {chunks.map((chunk, chunkIndex) => (
                <div key={chunkIndex}>
                  {chunk.map((attendee, index) => (
                    <>
                      <Link to={`/users/${attendee._id}`} key={index} className="attendee-circle" data-name={`${attendee.firstName} ${attendee.lastName}`}>
                        <img src={`../../${attendee.profilePhotoUrl}`} alt={`${attendee.firstName}'s Profile`} />
                      </Link>
                    </>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </>
      );
    }
  } else {
    return (
      <>
      <div className="attending-container">
        <p>{attendeesCount} Attending</p>
        <div className="attendees-list">
          {selectedEvent?.attendees.map((attendee, index) => (
            <Link to={`/users/${attendee._id}`} key={index} className="attendee-circle" data-name={`${attendee.firstName} ${attendee.lastName}`}>
              <img src={`../../${attendee.profilePhotoUrl}`} alt={`${attendee.firstName}'s Profile`} />
            </Link>
          ))}
        </div>
      </div>
      </>
    );
  }
}
