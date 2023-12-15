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
    e.preventDefault();
    const newObj = {
      firstName: formFirstName,
      lastName: formLastName,
      gender: formGender,
      primarySport: {
        Sport: formPrimarySport,
        Experience: formSportExperience,
      },
      height: formHeight,
      weight: formWeight,
    };
    dispatch(editUser(shownUser._id, newObj));
    // history.push(`/users/${currentUser._id}`)
    setCanEdit(false);
  }

  useEffect(() => {
    dispatch(getUser(id));
  }, [dispatch]);

  const secondarySports = shownUser?.secondarySports?.map((sport) => (
    <div className="secondary-sport">
      <h3>
        {sport.Sport}: {sport.Experience}
      </h3>
    </div>
  ));

  const dummyFriendsArray = [
    {
      _id: 1,
      firstName: "Robert",
      lastName: "Lee",
      profilePicUrl: "",
    },
  ];

  const userFriends = dummyFriendsArray.map((friend, index) => (
    <span key={index} className="user-friend">
      {friend.firstName} {friend.lastName}
    </span>
  ));

  return (
    <>
      <section id="user-show-main">
        <section id="general-info">
          <div id="profile-pic">
            <img src={`../../${shownUser?.profilePhotoUrl}`}></img>
            {currentUser?._id === shownUser?._id && (
              <button onClick={enableEdit}>Edit Profile</button>
            )}
            {canEdit && (
              <button onClick={(e) => makeChanges(e)}>Save Changes</button>
            )}
          </div>

          <section id="user-info">
            {canEdit ? (
              <>
                <input
                  type="text"
                  className="can-edit-input"
                  defaultValue={`${shownUser?.firstName}`}
                  onChange={(e) => setFormFirstName(e.target.value)}
                />
                <input
                  type="text"
                  className="can-edit-input"
                  defaultValue={`${shownUser.lastName}`}
                  onChange={(e) => setFormLastName(e.target.value)}
                />
              </>
            ) : (
              <h2>
                {shownUser?.firstName} {shownUser?.lastName}
              </h2>
            )}
            <h3>Gender:</h3>
            <p>{shownUser?.gender}</p>

            <h3>Favorite Sport:</h3>
            {canEdit ? (
              <>
                <select
                  onChange={(e) => setFormPrimarySport(e.target.value)}
                  defaultValue={shownUser?.primarySport?.Sport}
                >
                  {selectSportOptions}
                </select>
              </>
            ) : (
              <p>{shownUser?.primarySport?.Sport}</p>
            )}

            <h3>Experience Level:</h3>
            {canEdit ? (
              <select onChange={(e) => setFormSportExperience(e.target.value)}>
                {selectExperienceOptions}
              </select>
            ) : (
              <p>{shownUser?.primarySport?.Experience}</p>
            )}

            <h3>Secondary Sports</h3>
            <h3>{secondarySports}</h3>
            {currentUser._id === shownUser?._id ? (
              <>
                <h3>More Info</h3>
                {canEdit ? (
                  <input
                    type="number"
                    defaultValue={`${shownUser?.height}`}
                    onChange={(e) => setFormHeight(e.target.value)}
                  />
                ) : (
                  <h3>Height: {shownUser?.height}in</h3>
                )}
                {canEdit ? (
                  <input
                    type="number"
                    value={`${shownUser?.weight}`}
                    onChange={(e) => setFormWeight(e.target.value)}
                  />
                ) : (
                  <h3>Weight: {shownUser?.weight}lbs</h3>
                )}
              </>
            ) : (
              <></>
            )}
          </section>
          <section className="user-friends">
            <h2>Friends</h2>
            {userFriends}
          </section>
        </section>
      </section>
    </>
  );
}
