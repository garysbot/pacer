import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signup, clearSessionErrors } from '../../store/session';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import "./SignupForm.css"

function SignupForm ({ onSuccess }) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  
  let date = new Date();
  const history = useHistory()
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [day, setDay] = useState(date.getDate());
  const [month, setMonth] = useState(months[date.getMonth()]);
  const [year, setYear] = useState(date.getFullYear());
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('')
  const [primarySport, setPrimarySport] = useState({});
  const [experienceLevel, setExperienceLevel] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [selectedSports, setSelectedSports] = useState([]);
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();

  // ! UI State
  const [primarySportSelected, setPrimarySportSelected] = useState(false);

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const [stepOneErrors, setStepOneErrors] = useState({});
  const validateForm = () => {
    const newErrors = {};

    if (firstName.length < 3) {
      newErrors.firstName = 'First name must be at least 3 characters';
    }
    if (lastName.length < 3) {
      newErrors.lastName = 'Last name must be at least 3 characters';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.email = 'Invalid email address';
    }
    const currentDate = new Date();
    const selectedDate = new Date(birthday);
    const age = currentDate.getFullYear() - selectedDate.getFullYear();
    if (age < 18) {
      newErrors.age = 'Must be at least 18 years old';
    }
    if (!password) {
      newErrors.passwordErrorOne = 'Please enter a password';
    }
    if (password.length < 6) {
      newErrors.passwordErrorTwo = 'Password must be at least 6 characters';
    }
    if (!gender) {
      newErrors.gender = 'Please select a gender';
    } 
    setStepOneErrors(newErrors);

    // If there are no errors, return true; otherwise, return false
    return Object.keys(newErrors).length === 0;
  };

  const update = field => {
    let setState;

    switch (field) {
      case 'firstname':
        setState = setFirstName;
        break;
      case 'lastname':
        setState = setLastName;
        break;
      case 'email':
        setState = setEmail;
        break;
      case 'password':
        setState = setPassword;
        break;
      case 'password2':
        setState = setPassword2;
        break;
      default:
        throw Error('Unknown field in Signup Form');
    }

    return e => setState(e.currentTarget.value);
  }

  const handleNext = () => {
    if (step === 1 && !validateForm()) {
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
    if (step === 3) {
      // If going back from step 3, reset selectedSports to an empty array
      setSelectedSports([]);
    }
  };

  const handleSportSelection = (sport) => {
    if (selectedSports.includes(sport)) {
      // Deselect the sport if already selected
      setSelectedSports(selectedSports.filter((selectedSport) => selectedSport !== sport));
    } else if (selectedSports.length < 5) {
      // Select the sport if not selected and limit to 5 selections
      setSelectedSports([...selectedSports, sport]);
    }
  };

  const sportsList = [
    'Basketball 🏀', 'Soccer ⚽', 'Baseball ⚾', 'Tennis 🎾', 'Running 🏃‍♂️', 'Volleyball 🏐', 'Swimming 🏊‍♂️',
    'Yoga 🧘', 'Gym (Fitness) 🏋️', 'Handball 🤾', 'Biking 🚴', 'Martial Arts 🥋', 'Hockey 🏒', 'Football 🏈',
    'Hiking 🥾', 'Bowling 🎳', 'Water Sports 🏄', 'Ping Pong 🏓', 'Golf ⛳', 'Pickleball 🏓', 'Rock Climbing 🧗',
    'Skateboarding 🛹', 'Badminton 🏸', 'Walking 🚶', 'Lacrosse 🥍', 'Ultimate Frisbee 🥏', 'Rugby 🏉',
    'Archery 🏹', 'Fencing 🤺', 'Sailing ⛵', 'Rowing 🚣', 'Table Tennis 🏓', 'Squash 🧃', 'Equestrian 🐎',
    'CrossFit 🏋️‍♂️', 'Triathlons 🏊‍♂️🚴‍♂️🏃‍♂️', 'Cricket 🏏', 'Jiu-Jitsu 🥋', 'Boxing 🥊'
  ]
  const experienceLevels = ['Beginner', 'Intermediate', 'Advanced'];
  const [selectedProfilePicture, setSelectedProfilePicture] = useState(null);
  const profilePictures = [
    '../../../pacer-profile-pics/profile-pic-1.png',
    '../../../pacer-profile-pics/profile-pic-2.png',
    '../../../pacer-profile-pics/profile-pic-3.png',
    '../../../pacer-profile-pics/profile-pic-4.png',
    '../../../pacer-profile-pics/profile-pic-5.png',
    '../../../pacer-profile-pics/profile-pic-6.png',
    '../../../pacer-profile-pics/profile-pic-7.png',
    '../../../pacer-profile-pics/profile-pic-8.png',
    '../../../pacer-profile-pics/profile-pic-9.png',
    '../../../pacer-profile-pics/profile-pic-10.png',
    '../../../pacer-profile-pics/profile-pic-11.png',
    '../../../pacer-profile-pics/profile-pic-12.png',
    '../../../pacer-profile-pics/profile-pic-13.png',
    '../../../pacer-profile-pics/profile-pic-14.png',
    '../../../pacer-profile-pics/profile-pic-15.png',
  ];

  const handleProfilePictureSelection = (picture) => {
    setSelectedProfilePicture(picture);
  };

  const generateProfilePictureOptions = () => {
    return profilePictures.map((picture) => (
      <label key={picture} className='profile-picture-option'>
        <div>
          <input
            type="radio"
            value={picture}
            checked={selectedProfilePicture === picture}
            onChange={() => handleProfilePictureSelection(picture)}
          />
          <img src={picture} alt={`Profile ${picture}`} />
        </div>
      </label>
    ));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step === 1) {
      handleNext();
    } else if (step === 2) {
      // Set primary sport and proceed to step 3
      if (primarySport.sport && primarySport.experienceLevel) handleNext();
      else return;
      // setPrimarySport({ sport: primarySport.sport, experienceLevel });
    } else if (step === 3) {
      handleNext();
    } else if (step === 4) {
      const user = {
        firstName,
        lastName,
        dateOfBirth: birthday,
        primarySport,
        gender,
        email,
        // username,
        password,
        selectedSports,
        profilePhotoUrl: selectedProfilePicture,
      };

      const res = await dispatch(signup(user));
      if (res === "success") { 
        onSuccess();
        history.push('/discover');
      }
      else return;
    }
  };

  
  const generateYearOptions = () => {
    const arr = [];
    const startYear = 1905;
    const endYear = new Date().getFullYear();
    for (let i = endYear; i >= startYear; i--) {
        arr.push(<option value={i}>{i}</option>);
    }
    return arr;
  };

  const generateDayOptions = () => {
      const arr = [];
      const startDay = 1;
      const endDay = 31;
      for (let i = startDay; i <= endDay; i++) {
          arr.push(<option value={i}>{i}</option>);
      }
      return arr;
  };

  const generateMonthOptions = () => {
      const arr = [];
      for (let i = 0; i < months.length; i++) {
          arr.push(<option value={months[i]}>{months[i]}</option>);
      }
      return arr;
  };

  const handleExperienceLevel = (level) => {
    setExperienceLevel(level);
  };

  const headerTitles = [
    '🫶 Signup',
    '🏆 Select your favorite sport',
    'Select up to 5 additional sports',
    'Select Your Profile Picture',
  ];

  const headerMessages = [
    'Welcome to the party!',
    'Pacer is all about community',
    'Select up to 5 additional sports',
    '', // Empty string for the fourth step, as there's no specific message
  ];

  return (
    <>
    <div id="sign-up-errors">
      {errors}
    </div>
    <form className='signup-form' onSubmit={handleSubmit}>
      <div className='signup-form-content'>
        <div className='signup-form-header'>
          <h2>{headerTitles[step - 1]}</h2>
          <h3>{headerMessages[step - 1]}</h3>
        </div>

        {step === 1 && (
          <>
            <div className='field-container'>
              <label>
                <p className='field-label'>First Name</p>
                <input type='text'
                  value={firstName}
                  placeholder='First Name'
                  onChange={update('firstname')}
                  className='input-field'
                />
              </label>
              {stepOneErrors.firstName && <span className="sign-up-errors">{stepOneErrors.firstName}</span>}
            </div>
            <div className='field-container'>
              <label>
                <p className='field-label'>Last Name</p>
                <input type='text'
                  value={lastName}
                  placeholder='Last Name'
                  onChange={update('lastname')}
                  className='input-field'
                />
              </label>
              {stepOneErrors.lastName && <span className="sign-up-errors">{stepOneErrors.lastName}</span>}
            </div>

            <div className='field-container'>
              <label>
                <p className='field-label'>Email</p>
                <input type="text"
                  value={email}
                  onChange={update('email')}
                  placeholder="Email"
                  className='input-field'
                />
                <div className="errors">{errors?.email}</div>
              </label>
              {stepOneErrors.email && <span className="sign-up-errors">{stepOneErrors.email}</span>}
            </div>

            <div className='field-container'>
              <label>
                <p className='field-label'>Password</p>
                <input type="password"
                  value={password}
                  onChange={update('password')}
                  placeholder="Password"
                  className='input-field'
                />
                <div className="errors">{errors?.password}</div>
              </label>
              {stepOneErrors.passwordErrorOne && <span className="sign-up-errors">{stepOneErrors.passwordErrorOne}</span>}
              {stepOneErrors.passwordErrorTwo && <span className="sign-up-errors">{stepOneErrors.passwordErrorTwo}</span>}
            </div>

            <div className='field-container'>
              <label>
                <p className='field-label'>Confirm Password</p>
                <input type="password"
                  value={password2}
                  onChange={update('password2')}
                  placeholder="Confirm Password"
                  className='input-field'
                />
              </label>
              <div className="errors">
                {password !== password2 && <span className='sign-up-errors'>Passwords must match</span>}
              </div>
            </div>

            <div className="field-container">
              <p className='field-label'>Birthday</p>

              <div className='field-row-container'>
                <select
                    name='month'
                    onChange={(e) => {setMonth(e.target.value); setBirthday(e.target.value.toString()+'-'+month.toString()+'-'+day.toString())}}
                    value={month}
                    className='select-field month'
                >
                    {generateMonthOptions()}
                </select>
                <select
                    name='day'
                    onChange={(e) => {setDay(e.target.value); setBirthday(e.target.value.toString()+'-'+month.toString()+'-'+day.toString())}}
                    value={day}
                    className='select-field date'
                >
                    {generateDayOptions()}
                </select>
                <select
                    name='year'
                    onChange={(e) => {setYear(e.target.value); setBirthday(e.target.value.toString()+'-'+month.toString()+'-'+day.toString());}}
                    value={year}
                    className='select-field year'
                >
                    {generateYearOptions()}
                </select>
              </div>
              {stepOneErrors.age && <span className="sign-up-errors">{stepOneErrors.age}</span>}
            </div>
            
            <div className="field-container gender-container">
              <p className='field-label'>Gender</p>
              <div className='gender-row-container'>
                <div className='gender-option'>
                  <span>Male</span>
                  <input type='radio' value="male" onClick={(e)=>setGender(e.target.value)}/>
                </div>
                <div className='gender-option'>
                  <span>Female</span>
                  <input type='radio' value="female" onClick={(e)=>setGender(e.target.value)}/>
                </div>
                <div className='gender-option'>
                  <span>Other</span>
                  <input type='radio' value="other" onClick={(e)=>setGender(e.target.value)}/>
                </div>
              </div>
              {stepOneErrors.gender && <span className="sign-up-errors">{stepOneErrors.gender}</span>}
            </div>
            <span></span>

            <input
              type="button"
              value="Next"
              onClick={handleNext}
              disabled={!email || !password || password !== password2}
              className='signup-button'
            />
          </>
        )}

        {step === 2 && (
          <>
            {/* //! Sport Container */}
            <div className='primary-sport-container'>
              {sportsList.map((sport) => (
                <div key={sport} className={`sport-option-container`}>

                  <button
                    value={sport}
                    onClick={(e) => setPrimarySport({ sport, experienceLevel: '' }) }
                    className={primarySport.sport === sport ? 'selected' : ''}
                  >
                    <span className='sport-button-label'>{sport}</span>
                  </button>

                </div>
              ))}
            </div>

            {/* <h1>Select your Experience Level</h1> */}
            <div className='experience-container'>
              <span>Experience Level</span>
              <div className="experience-level-radio-div">
                {experienceLevels.map((level) => (
                  <label key={level}>
                    <input
                      type="radio"
                      value={level}
                      checked={primarySport.experienceLevel === level}
                      onChange={() =>
                        setPrimarySport({ ...primarySport, experienceLevel: level })
                      }
                    />
                    <span className='sport-button-label'>{level}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={handleNext}
              disabled={!primarySport.sport || !primarySport.experienceLevel}
              className='signup-button'
            >
              Next
            </button>
            {step > 1 && (
              <div id="sign-up-back-button">
                <button 
                  type="button" 
                  onClick={handleBack}
                  className='signup-button'
                >
                  Back
                </button>
              </div>
            )}
          </>
        )}

        {step === 3 && (
          <>
            {/* Render buttons for secondary sports */}
            <div className='primary-sport-container'>
              {sportsList
                .filter((sport) => sport !== primarySport)
                .map((sport) => (
                  <label key={sport} className='secondary-sport-list-input-label'>
                    <input 
                      type="checkbox"
                      value={sport}
                      checked={selectedSports.includes(sport)}
                      onChange={() => handleSportSelection(sport)}
                    />
                    {sport}
                  </label>
                ))
              }
            </div>
            <button
              type="button"
              onClick={handleNext}
              disabled={!primarySport.sport || !primarySport.experienceLevel}
              className='signup-button'
            >
              Next
            </button>
            {/* <input type="submit" value="Sign Up" className='signup-button'/> */}
            {step > 1 && (
              <div id="sign-up-back-button">
                <button 
                  type="button" 
                  onClick={handleBack}
                  className='signup-button'
                >
                  Back
                </button>
              </div>
            )}
          </>
        )}

        {step === 4 && (
          <>
            {/* Profile picture selection */}
            <div className='profile-picture-container'>
              {/* <h2>Select Your Profile Picture</h2> */}
              {generateProfilePictureOptions()}
            </div>
            <input type="submit" value="Sign Up" className='signup-button'/>
            {step > 1 && (
              <div id="sign-up-back-button">
                <button 
                  type="button" 
                  onClick={handleBack}
                  className='signup-button'
                >
                  Back
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </form>
    </>
  );
}

export default SignupForm;