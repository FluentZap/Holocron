import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { navigate } from "@reach/router";
import './MainMenuStyles.css';
import { a } from 'react-spring'
import FadeInBuilder from '../FadeInBuilder';


function MainMenu(props) {
  
  const [setFade, getFade] = new FadeInBuilder();

  // const [springs, set, stop] = useSprings(4, index => ({ opacity: 1 }))  
  // const [panelFade, set] = useSpring(() => ({ opacity: 0, config: { mass: 1, tension: 280, friction: 1000 } }))

  useEffect(() => {
    setFade({ opacity: 1 })
  })

  return (
    <div className='flex-center full-screen' style={{ overflow: 'hidden' }}>

      <div className='data-container scanlines-background'>
        <a.button onClick={() => navigate('/roster')} className='flex-center data-panel red-glow scanlines-back m3 main-menu-panel' style={{ ...getFade(), gridArea: '1 / 1 / span 16 / span 10' }}>Roster</a.button>

        <a.button onClick={() => navigate('/archives')} className='disabled flex-center data-panel red-glow scanlines-back m3 main-menu-panel' style={{ ...getFade(), gridArea: '1 / 11 / span 8 / span 10' }}>Archives</a.button>
        <a.button onClick={() => navigate('/hanger')} className='disabled flex-center data-panel red-glow scanlines-back m3 main-menu-panel' style={{ ...getFade(), gridArea: '9 / 11 / span 8 / span 10' }}>Hanger</a.button>

        <a.button onClick={() => navigate('/adventures')} className='disabled flex-center data-panel red-glow scanlines-back m3 main-menu-panel' style={{ ...getFade(), gridArea: '17 / 1 / span 8 / span 20' }}>Adventures</a.button>

        <a.button onClick={() => navigate('/atlas')} className='disabled flex-center data-panel red-glow scanlines-back m3 main-menu-panel' style={{ ...getFade(), gridArea: '25 / 1 / span 8 / span 10' }}>Atlas</a.button>
        <a.button onClick={() => navigate('/notes')} className='disabled flex-center data-panel red-glow scanlines-back m3 main-menu-panel' style={{ ...getFade(), gridArea: '33 / 1 / span 8 / span 10' }}>Notes</a.button>

        <a.button onClick={() => navigate('/roller')} className='disabled flex-center data-panel red-glow scanlines-back m3 main-menu-panel' style={{ ...getFade(), gridArea: '25 / 11 / span 16 / span 10' }}>Dice Roller</a.button>
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
