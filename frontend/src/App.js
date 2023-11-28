import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';

import { AuthRoute, ProtectedRoute } from './components/Routes/Routes.js';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import EventForm from './components/EventForm/EventForm.js';

import SplashPage from './components/SplashPage/SplashPage.js';
import DiscoverPage from './components/DiscoverPage/DiscoverPage.js';
import UsersShow from './components/UsersShow/UsersShow.js';

import { getCurrentUser } from './store/session';
import { Route } from 'react-router-dom/cjs/react-router-dom.min.js';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);


  return loaded && (
    <>
      <NavBar />
      {/* <EventForm/> */}
      <Switch>
        <Route exact path="/discover" component={DiscoverPage}/>
        <Route exact path="/" component={SplashPage} />
        <Route exact path="/users/:id" component={UsersShow}/>

        {/* <ProtectedRoute exact path="/tweets" component={Tweets} /> */}
        {/* <ProtectedRoute exact path="/profile" component={Profile} /> */}
        {/* <ProtectedRoute exact path="/tweets/new" component={TweetCompose} /> */}
      </Switch>
      <Footer />
    </>
  );
}

export default App;