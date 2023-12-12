import React from "react";
import { useState, useEffect} from "react";
import './UsersShow.css';
import { useDispatch, useSelector } from "react-redux"
import { fetchEvents } from "../../store/events"
import { getUser } from "../../store/users"
import { useParams } from "react-router-dom"
export default function UsersShow(){
    const dispatch = useDispatch()
    const {id} = useParams()
    const shownUser = useSelector(state=>state.users?.user)
    const currentUser = useSelector(state=>state.session?.user)
// =============== implementing an edit user functionality ================
    const [canEdit, setCanEdit] = useState(false)
    function enableEdit(){
        setCanEdit(!canEdit)
        console.log(canEdit)
    }
    // =============== list of sports for the edit form ==============================
    const sportsList = [
    'Basketball', 'Soccer', 'Baseball', 'Tennis', 'Running', 'Volleyball', 'Swimming',
    'Yoga', 'Gym (Fitness)', 'Handball', 'Biking', 'Martial Arts', 'Hockey', 'Football',
    'Hiking', 'Bowling', 'Water Sports', 'Ping Pong', 'Golf', 'Pickleball', 'Rock Climbing',
    'Skateboarding', 'Badminton', 'Walking', 'Lacrosse', 'Ultimate Frisbee', 'Rugby',
    'Archery', 'Fencing', 'Sailing', 'Rowing', 'Table Tennis', 'Squash', 'Equestrian',
    'CrossFit', 'Triathlons', 'Cricket', 'Jiu-Jitsu', 'Boxing'
    ];
    const selectSportOptions = sportsList.map((sport)=>{
        return (
            <option value={sport}>{sport}</option>
        )
    })
// ============== list of experiences for the edit form========================
    const experienceLevels = ['Beginner', 'Intermediate', 'Advanced'];
    const selectExperienceOptions = experienceLevels.map((e)=>{
        return (
            <option value={e}>{e}</option>
        )
    })
// ================= formstates ==========================
    const [formFirstName, setFormFirstName] = useState()
    const [formLastName, setFormLastName] = useState()
    const [formGender, setFormGender] = useState()
    const [formPrimarySport, setFormPrimarySport] = useState()
    const [formSportExperience, setFormSportExperience] = useState()
    const [formHeight, setFormHeight] = useState()
    const [formWeight, setFormWeight] = useState()
// =============== update Object =====================
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




    useEffect(()=>{
        dispatch(getUser(id))
    },[dispatch])
    const secondarySports = shownUser?.secondarySports?.map((sport)=>(
        <div className="secondary-sport">
            <h3>{sport.Sport}: {sport.Experience}</h3>
        </div>))
    const userFriends = shownUser?.friends?.map((friend, index)=>(
        <span key={index} className="attendee-circle"></span>
    ))
    return (
        <>
            <section id="user-show-main">
                <section id="general-info">
                    <div id="profile-pic">
                        <img src={`../../${shownUser?.profilePhotoUrl}`}></img>
                        {currentUser?._id === shownUser?._id && <button onClick={enableEdit}>Edit Profile</button>}
                        {canEdit && <button>Save Changes</button>}
                    </div>
                    <section id="user-info">
                        <span className="blur-header">
                            {canEdit 
                            ? 
                                <>
                                    <input type="text"
                                        className="can-edit-input"
                                        value={`${shownUser?.firstName}`}
                                        onChange={(e)=>setFormFirstName(e.target.value)}

                                    />
                                    <input type="text"
                                        className="can-edit-input"
                                        value={`${shownUser.lastName}`}
                                        onChange={(e)=>setFormLastName(e.target.value)}
                                    /> 
                                </>
                            : 
                                <h2>
                                    {shownUser?.firstName} {shownUser?.lastName}
                                </h2>}
                            <h3>Gender:</h3> 
                                {canEdit 
                                ? 
                                    <input type="text"
                                        className="can-edit-input"
                                        value={`${shownUser?.gender}`}
                                        onChange={(e)=>setFormGender(e.target.value)}
                                    />
                                : 
                                    <h3>{shownUser?.gender}</h3>
                                
                                }
                                

                        </span>
                    <br/>
                        <span className="blur-header">
                            <h2>
                                Favorite Sport:
                            </h2>
                            {canEdit 
                            ? 
                                <>
                                    <select onChange={(e)=>setFormPrimarySport(e.target.value)}>
                                        {selectSportOptions}
                                    </select>
                                </> 
                            : 
                                <h3>
                                    {shownUser?.primarySport?.Sport}
                                </h3>
                            }

                        </span>
                        <br/>
                    <span className="blur-header">
                        <h2>
                            Experience Level:
                        </h2>
                        {canEdit 
                        ? 
                        <select onChange={(e)=>setFormSportExperience(e.target.value)}>
                            {selectExperienceOptions}
                        </select>
                        :
                            <h3>
                                {shownUser?.primarySport?.Experience}
                            </h3>
                        }

                    </span>
                    <br/>
                    <span className="blur-header">
                        <h2>Secondary Sports</h2>
                        <h3>
                            {secondarySports}
                        </h3>
                    </span>
                    {currentUser._id === shownUser?._id ?
                        <>
                            <h2>More Info</h2>
                            <span className="blur-header">
                                {canEdit 
                                ? 
                                    <input type="number"
                                        value={`${shownUser?.height}`}
                                    /> 
                                : 
                                    <h3>Height: {shownUser?.height}in</h3>        
                                }
                            </span>
                            <span className="blur-header">
                                {canEdit 
                                ? 
                                    <input type="number"
                                        value={`${shownUser?.weight}`}
                                    /> 
                                : 
                                    <h3>Weight: {shownUser?.weight}lbs</h3>
                                }
                            </span>
                        </>  
                    : <></>}
                    </section>
                    <section className="user-friends">
                        <span className="blur-header">
                            <h2>Friends</h2>
                        </span>
                    </section>
                </section>
            </section>
        </>
    )
}