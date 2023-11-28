import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';

import { AuthRoute, ProtectedRoute } from './components/Routes/Routes.js';
import NavBar from './components/NavBar/NavBar';
import EventForm from './components/EventForm/EventForm.js';

import Splash from './components/Splash/Splash.js';
import Tweets from './components/Tweets/TweetBox.js';
import Profile from './components/Profile/Profile';
import TweetCompose from './components/Tweets/TweetCompose';
import Discovery from './components/Discovery.js';

import { getCurrentUser } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);


  return loaded && (
    <>
      <NavBar />
      <EventForm/>
      <Switch>
        <AuthRoute exact path="/" component={Splash} />
        <AuthRoute exact path="/discovery" component={Discovery}/>
        {/* <ProtectedRoute exact path="/tweets" component={Tweets} /> */}
        {/* <ProtectedRoute exact path="/profile" component={Profile} /> */}
        {/* <ProtectedRoute exact path="/tweets/new" component={TweetCompose} /> */}
      </Switch>
    </>
  );
}

export default App;