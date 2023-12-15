import './SplashPage.css'
import { ReactComponent as MapPin } from '../../icons/running-pin.svg'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function SplashPage() {

  const RunningPin = () => <MapPin className='pin' />

  return (
    <>
      <main>
        <div className='video-background'>
          <video autoPlay loop muted playsInline>
            <source src='../../static/splash-vid-3.mp4' type="video/mp4"/>
          </video>
          <div className='video-overlay'>
            <h1>Exercising is <h1 className='animate-characters'>lonely af</h1></h1>
            <h3>Pacer connects you with new exercise pals at your performance level</h3>
            <Link to='/discover'><button class="learn-more">Discover Events</button></Link>
          </div>
        </div>

        {/* <div className='section-container'>
          <div className='section-content'>
            <RunningPin
              className='pin'
            />
            <h1>Find your workout buddy</h1>
            <p>With communities across running, cycling, swimming and more.</p>
          </div>
        </div>

        <div className='section-container'>
          <div className='section-content'>
            <h1>Hello from MainPage</h1>
            <h3>Subhead</h3>
            <p>Lorem ipsum words and words and wordsords and words and wordsords and words and words</p>
          </div> 
        </div>

        <div className='section-container'>
          <div className='section-content'>
            <h1>Hello from MainPage</h1>
            <h3>Subhead</h3>
            <p>Lorem ipsum words and words and wordsords and words and wordsords and words and words</p>
          </div>
        </div> */}
      </main>
    </>
  );
}

export default SplashPage;