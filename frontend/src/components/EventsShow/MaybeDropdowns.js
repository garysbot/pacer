import { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function MaybeDropdowns({ selectedEvent }) {
  const [showMaybes, setShowMaybes] = useState(true);

  const handleDownArrowToggle = () => {
    setShowMaybes(!showMaybes);
  };

  const maybesCount = selectedEvent?.maybes.length;

  if (maybesCount > 4) {
    if (showMaybes) {
      return (
        <>
          <div className="attending-container">
            <p>
            {maybesCount} Interested <span onClick={handleDownArrowToggle} style={{ cursor: 'pointer' }}>{showMaybes? ' \u25B6' : ' \u25BC'}</span></p>
            <div className="maybes-list" style={{ display: showMaybes ? "block" : "none" }}>
            {selectedEvent?.maybesDetails.slice(0, 4).map((maybes, index) => (
              <>
                  <Link to={`/users/${maybes._id}`} key={index} className="attendee-circle" data-name={`${maybes.firstName} ${maybes.lastName}`}>
                    <img src={`../../${maybes.profilePhotoUrl}`} alt={`${maybes.firstName}'s Profile`} />
                  </Link>
              </>
            ))}
            </div>
          </div>
        </>
      );
    } else {
      const chunks = [];
      for (let i = 0; i < maybesCount; i += 4) {
        chunks.push(selectedEvent?.maybesDetails.slice(i, i + 4));
      }

      return (
        <>
        <div className="attending-container">
            <p>{maybesCount} Interested <span onClick={handleDownArrowToggle} style={{ cursor: 'pointer' }}>&#9660;</span></p>
            <div className="maybes-list">
              {chunks.map((chunk, chunkIndex) => (
                <div key={chunkIndex}>
                  {chunk.map((maybes, index) => (
                    <>
                      <Link to={`/users/${maybes._id}`} key={index} className="attendee-circle" data-name={`${maybes.firstName} ${maybes.lastName}`}>
                        <img src={`../../${maybes.profilePhotoUrl}`} alt={`${maybes.firstName}'s Profile`} />
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
          <p>{maybesCount} Interested</p>
          <div className="maybes-list">
            {selectedEvent?.maybesDetails.map((maybes, index) => (
              <>
                  <Link to={`/users/${maybes._id}`} key={index} className="attendee-circle" data-name={`${maybes.firstName} ${maybes.lastName}`}>
                    <img src={`../../${maybes.profilePhotoUrl}`} alt={`${maybes.firstName}'s Profile`} />
                  </Link>
              </>
            ))}
          </div>
        </div>
      </>
    );
  }
}