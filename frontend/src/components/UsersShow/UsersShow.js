import React from "react";
import { useState, useEffect } from "react";
import "./UsersShow.css";
import { useDispatch, useSelector } from "react-redux";
import { getUser, editUser } from "../../store/users";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router-dom";

export default function UsersShow() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const shownUser = useSelector((state) => state.users?.user);
  const currentUser = useSelector((state) => state.session?.user);

  // =============== implementing an edit user functionality ================
  const [canEdit, setCanEdit] = useState(false);
  function enableEdit() {
    setCanEdit(!canEdit);
  }

  // =============== list of sports for the edit form ==============================
  const sportsList = [
    "Basketball",
    "Soccer",
    "Baseball",
    "Tennis",
    "Running",
    "Volleyball",
    "Swimming",
    "Yoga",
    "Gym (Fitness)",
    "Handball",
    "Biking",
    "Martial Arts",
    "Hockey",
    "Football",
    "Hiking",
    "Bowling",
    "Water Sports",
    "Ping Pong",
    "Golf",
    "Pickleball",
    "Rock Climbing",
    "Skateboarding",
    "Badminton",
    "Walking",
    "Lacrosse",
    "Ultimate Frisbee",
    "Rugby",
    "Archery",
    "Fencing",
    "Sailing",
    "Rowing",
    "Table Tennis",
    "Squash",
    "Equestrian",
    "CrossFit",
    "Triathlons",
    "Cricket",
    "Jiu-Jitsu",
    "Boxing",
  ];

  const selectSportOptions = sportsList.map((sport) => {
    return <option value={sport}>{sport}</option>;
  });

  // ============== list of experiences for the edit form========================
  const experienceLevels = ["Beginner", "Intermediate", "Advanced"];
  const selectExperienceOptions = experienceLevels.map((e) => {
    return <option value={e}>{e}</option>;
  });

  // ================= formstates ==========================
  const [formFirstName, setFormFirstName] = useState(shownUser?.firstName);
  const [formLastName, setFormLastName] = useState(shownUser?.lastName);
  const [formGender, setFormGender] = useState(shownUser?.gender);
  const [formPrimarySport, setFormPrimarySport] = useState(
    shownUser?.primarySport?.Sport
  );
  const [formSportExperience, setFormSportExperience] = useState(
    shownUser?.primarySport?.Experience
  );
  const [formHeight, setFormHeight] = useState(shownUser?.height);
  const [formWeight, setFormWeight] = useState(shownUser?.weight);
  // =============== update Object =====================

  function makeChanges(e) {
    e.preventDefault()
    const newObj = {
      firstName: formFirstName,
      lastName: formLastName,
      gender: formGender,
      primarySport: {
        Sport: formPrimarySport,
        Experience: formSportExperience
      },
      height: formHeight,
      weight: formWeight
    }
    dispatch(editUser(shownUser._id, newObj))
    // history.push(`/users/${currentUser._id}`)
    setCanEdit(false)
  }



  useEffect(() => {
    dispatch(getUser(id))
  }, [dispatch])
  const secondarySports = shownUser?.secondarySports?.map((sport) => (
    <div className="secondary-sport">
      <p>{sport.Sport}: {sport.Experience}</p>
    </div>))



  const dummyFriendsArray = [
    {
      _id: 1,
      firstName: "Robert",
      lastName: "Lee",
      profilePicUrl: ""
    }
  ]
  const userFriends = dummyFriendsArray.map((friend, index) => (
    <span key={index} className="user-friend">{friend.firstName} {friend.lastName}</span>
  ))



  return (
    <>
      <section id="user-show-main">

        <section id="profile-column">
          <div id="profile-pic">
            <img src={`../../${shownUser?.profilePhotoUrl}`}></img>
            {currentUser?._id === shownUser?._id && <button className='user-edit-buttons' onClick={enableEdit}>Edit Profile</button>}
            {canEdit && <button className='user-edit-buttons' onClick={(e) => makeChanges(e)}>Save Changes</button>}
          </div>
        </section>

        <section id="user-column">
          {canEdit
            ?
            <>
              <div className="edit-field">
                <input type="text"
                  className="can-edit-input"
                  defaultValue={`${shownUser?.firstName}`}
                  onChange={(e) => setFormFirstName(e.target.value)}
                />
                <input type="text"
                  className="can-edit-input"
                  defaultValue={`${shownUser.lastName}`}
                  onChange={(e) => setFormLastName(e.target.value)}
                />
              </div>
            </>
            :
            <h2>{shownUser?.firstName} {shownUser?.lastName}</h2>
          }

          <p className="field-label-user-show">Gender:</p>
          <p className="field-value-user-show">{shownUser?.gender}</p>

          <p className="field-label-user-show">Favorite Sport:</p>
          {canEdit
            ?
            <>
              <select
                className="can-edit-input sport-field"
                onChange={(e) => setFormPrimarySport(e.target.value)}
                defaultValue={shownUser?.primarySport?.Sport}
              >
                {selectSportOptions}
              </select>
            </>
            :
            <p className="field-value-user-show">{shownUser?.primarySport?.Sport}</p>
          }

          <p className="field-label-user-show">Experience Level:</p>
          {canEdit
            ?
            <select
              className="can-edit-input sport-field"
              onChange={(e) => setFormSportExperience(e.target.value)}>
              {selectExperienceOptions}
            </select>
            :
            <p className="field-value-user-show">{shownUser?.primarySport?.Experience}</p>
          }

          <p className="field-label-user-show">Secondary Sports</p>
          <p className="field-value-user-show">{secondarySports}</p>
          <section className="stats-column">
            {currentUser?._id === shownUser?._id ?
              <>
                <h3 className="field-label-user-show">Personal Stats</h3>
                {canEdit
                  ?
                  <input type="number"
                    className="can-edit-input other-field"
                    defaultValue={`${shownUser?.height}`}
                    onChange={(e) => setFormHeight(e.target.value)}
                  />
                  :
                  <p className="field-value-user-show">Height: {shownUser?.height}in</p>
                }
                {canEdit
                  ?
                  <input type="number"
                    className="can-edit-input other-field"
                    value={`${shownUser?.weight}`}
                    onChange={(e) => setFormWeight(e.target.value)}
                  />
                  :
                  <p className="field-value-user-show">Weight: {shownUser?.weight}lbs</p>
                }
              </>
              :
              <>
              </>
            }
          </section>
        </section>

      </section>
    </>
  )
}
