import './SplashPage.css'

function SplashPage() {
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
          </div>
        </div>

        <div className='section-container'>
          <div className='section-content'>
            <h1>Find your workout buddy</h1>
            <p>With communities across running, cycling, swimming and more.</p>
          </div>
        </div>

        <div className='section-container'>
          <h1>Hello from MainPage</h1>
          <h3>Subhead</h3>
          <p>Lorem ipsum words and words and wordsords and words and wordsords and words and words</p>
        </div>

        <div className='section-container'>
          <h1>Hello from MainPage</h1>
          <h3>Subhead</h3>
          <p>Lorem ipsum words and words and wordsords and words and wordsords and words and words</p>
        </div>
      </main>
    </>
  );
}

export default SplashPage;