import React from 'react';
import { connect } from 'react-redux'
import { navigate } from "@reach/router";
import './MainMenuStyles.css';
import FadeInBuilder from '../FadeInBuilder';

const fadeIn = new FadeInBuilder(0, 0.3, 7);

function MainMenu(props) {
  return (
    <div className='flex-center full-screen' style={{overflow: 'hidden'}}>

      <div className='data-container scanlines-background'>
        <button onClick={() => navigate('/roster')} className='animate-fade-in flex-center data-panel red-glow scanlines-back m3 main-menu-panel' style={{ gridArea: '1 / 1 / span 16 / span 10', animationDelay: fadeIn()}}>Roster</button>

        <button onClick={() => navigate('/archives')} className='animate-fade-in flex-center data-panel red-glow scanlines-back m3 main-menu-panel' style={{ gridArea: '1 / 11 / span 8 / span 10', animationDelay: fadeIn()}}>Archives</button>
        <button onClick={() => navigate('/hanger')} className='animate-fade-in flex-center data-panel red-glow scanlines-back m3 main-menu-panel' style={{ gridArea: '9 / 11 / span 8 / span 10', animationDelay: fadeIn()}}>Hanger</button>

        <button onClick={() => navigate('/adventures')} className='animate-fade-in flex-center data-panel red-glow scanlines-back m3 main-menu-panel' style={{ gridArea: '17 / 1 / span 8 / span 20', animationDelay: fadeIn()}}>Adventures</button>

        <button onClick={() => navigate('/atlas')} className='animate-fade-in flex-center data-panel red-glow scanlines-back m3 main-menu-panel' style={{ gridArea: '25 / 1 / span 8 / span 10', animationDelay: fadeIn()}}>Atlas</button>
        <button onClick={() => navigate('/notes')} className='animate-fade-in flex-center data-panel red-glow scanlines-back m3 main-menu-panel' style={{ gridArea: '33 / 1 / span 8 / span 10', animationDelay: fadeIn()}}>Notes</button>

        <button onClick={() => navigate('/roller')} className='animate-fade-in flex-center data-panel red-glow scanlines-back m3 main-menu-panel' style={{ gridArea: '25 / 11 / span 16 / span 10', animationDelay: fadeIn()}}>Dice Roller</button>
      </div>
    </div>
  );
}


function mapStateToProps(state) {
  return {
    messages: state
  };
}

export default connect(mapStateToProps)(MainMenu);
