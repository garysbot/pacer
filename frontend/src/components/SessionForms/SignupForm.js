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
  const [birthday, setBirthday] = useState(date);
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

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

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
      case 'username':
        setState = setUsername;
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
    'Basketball', 'Soccer', 'Baseball', 'Tennis', 'Running', 'Volleyball', 'Swimming', 'Yoga', 'Gym (Fitness)',
    'Handball', 'Biking', 'Martial Arts', 'Hockey', 'Football', 'Hiking', 'Bowling', 'Water Sports', 'Ping Pong',
    'Golf', 'Pickleball', 'Rock Climbing', 'Skateboarding', 'Badminton', 'Walking', 'Lacrosse', 'Ultimate Frisbee',
    'Rugby', 'Archery', 'Fencing', 'Sailing', 'Rowing', 'Table Tennis', 'Squash', 'Equestrian sports (horseback riding)',
    'CrossFit (fitness activity/sport)', 'Triathlons', 'Cricket', 'Jiu-Jitsu', 'Boxing'
  ]
  const experienceLevels = ['Beginner', 'Intermediate', 'Advanced'];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (step === 1) {
      // Proceed to the next step
      handleNext();
    } else if (step === 2) {
      // Set primary sport and proceed to step 3
      handleNext();
      setPrimarySport({ sport: primarySport.sport, experienceLevel });
    } else if (step === 3) {
      // Perform signup and dispatch
      const user = {
        firstName,
        lastName,
        dateOfBirth: birthday,
        primarySport,
        gender,
        email,
        username,
        password,
        selectedSports,
      };

      dispatch(signup(user));
      onSuccess();
      history.push('/discovery');
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

  return (
    <form className="session-form" onSubmit={handleSubmit}>
      <h2>{step === 1 ? 'Sign Up Form' : step === 2 ? 'Select your favorite sport' : 'Select up to 5 additional sports'}</h2>
      <div className="errors">{errors?.email}</div>
      {step === 1 && (
        <>
          <div className='firstlast name'>
            <label>
              <input type='text'
                value={firstName}
                placeholder='First Name'
                onChange={update('firstname')}
              />
            </label>
            <label>
              <input type='text'
                value={lastName}
                placeholder='Last Name'
                onChange={update('lastname')}
              />
            </label>
          </div>
          <label>
            {/* <span>Email</span> */}
            <input type="text"
              value={email}
              onChange={update('email')}
              placeholder="Email"
            />
          </label>
          <div className="errors">{errors?.username}</div>
          <label>
            {/* <span>Username</span> */}
            <input type="text"
              value={username}
              onChange={update('username')}
              placeholder="Username"
            />
          </label>
          <div className="errors">{errors?.password}</div>
          <label>
            {/* <span>Password</span> */}
            <input type="password"
              value={password}
              onChange={update('password')}
              placeholder="Password"
            />
          </label>
          <div className="errors">
            {password !== password2 && 'Confirm Password field must match'}
          </div>
          <label>
            {/* <span>Confirm Password</span> */}
            <input type="password"
              value={password2}
              onChange={update('password2')}
              placeholder="Confirm Password"
            />
          </label>
          
          <div className="sign-up-birthday-field">
            <label>Birthday</label>
            <select
                name='month'
                onChange={(e) => {setMonth(e.target.value); setBirthday(year.toString()+'-'+month.toString()+'-'+day.toString())}}
                value={month}
            >
                {generateMonthOptions()}
            </select>
            <select
                name='day'
                onChange={(e) => {setDay(e.target.value); setBirthday(year.toString()+'-'+month.toString()+'-'+day.toString())}}
                value={day}
            >
                {generateDayOptions()}
            </select>
            <select
                name='year'
                onChange={(e) => {setYear(e.target.value); setBirthday(year.toString()+'-'+month.toString()+'-'+day.toString())}}
                value={year}
            >
                {generateYearOptions()}
            </select>
          </div>
          <div className="sign-up-gender-field">
            <label>Gender</label>
            <section className='gender'>
              Male
              <input type='radio' value="male" onClick={(e)=>setGender(e.target.value)}/>
              Female
              <input type='radio' value="female" onClick={(e)=>setGender(e.target.value)}/>
              Other
              <input type='radio' value="other" onClick={(e)=>setGender(e.target.value)}/>
            </section>
          </div>
        </>
      )}
      {/* <section className='primary sport'>
        <input type='text'
          onChange={(e)=>setPrimarySport(e.target.value)}
          placeholder='Primary Sport'
        />
      </section> */}
      {step > 1 && (
        <div id="sign-up-back-button">
          <button type="button" onClick={handleBack}>
            Back
          </button>
        </div>
      )}
      {step === 1 && (
        <input
          type="button"
          value="Next"
          onClick={handleNext}
          disabled={!email || !username || !password || password !== password2}
        />
      )}
      {step === 2 && (
        <>
          {/* Render checkboxes for primary sports */}
          {sportsList.map((sport) => (
            <div key={sport} className="sport-option">
              <label>
                <input
                  type="checkbox"
                  value={sport}
                  checked={primarySport.sport === sport}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setPrimarySport({ sport, experienceLevel: '' });
                    } else {
                      setPrimarySport({});
                    }
                  }}
                />
                {sport}
              </label>
            </div>
          ))}
          <div className="experience-level-radio">
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
                {level}
              </label>
            ))}
          </div>
          <button
            type="button"
            onClick={handleNext}
            disabled={!primarySport.sport || !primarySport.experienceLevel}
          >
            Next
          </button>
        </>
      )}

      {/* <input
        type="submit"
        value="Sign Up"
        disabled={!email || !username || !password || password !== password2}
      /> */}
      {step === 3 && (
        <>
          {/* Render buttons for secondary sports */}
          {sportsList
            .filter((sport) => sport !== primarySport)
            .map((sport) => (
              <label key={sport}>
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
          <input type="submit" value="Sign Up" />
        </>
      )}
    </form>
  );
}

export default SignupForm;