import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { navigate } from "@reach/router";
import './MainMenuStyles.css';
import { Button } from '../Panels/Panels';

function MainMenu({ sessionToken }) {

  // const [springs, set, stop] = useSprings(4, index => ({ opacity: 1 }))  
  // const [panelFade, set] = useSpring(() => ({ opacity: 0, config: { mass: 1, tension: 280, friction: 1000 } }))

  return (
    <div className='flex-center full-screen' style={{ overflow: 'hidden' }}>

      <div className='data-container scanlines-background'>
        <Button onClick={() => navigate('/roster')} className='red-glow' area={[1, 1, 16, 11]}>Roster</Button>

        <button className='disabled flex-center data-panel red-glow scanlines-back m2 main-menu-panel'
          style={{ gridArea: '1 / 12 / span 8 / span 11' }}>Archives</button>

        <button className='disabled flex-center data-panel red-glow scanlines-back m2 main-menu-panel'
          style={{ gridArea: '9 / 12 / span 8 / span 11' }}>Hanger</button>

        <button onClick={() => navigate('/adventures')} className='flex-center data-panel red-glow scanlines-back m2 main-menu-panel'
          style={{ gridArea: '17 / 1 / span 8 / span 22' }}>Adventures</button>

        <button className='disabled flex-center data-panel red-glow scanlines-back m2 main-menu-panel'
          style={{ gridArea: '25 / 1 / span 8 / span 11' }}>Atlas</button>

        <button className='disabled flex-center data-panel red-glow scanlines-back m2 main-menu-panel'
          style={{ gridArea: '33 / 1 / span 8 / span 11' }}>Notes</button>

        <button className='disabled flex-center data-panel red-glow scanlines-back m2 main-menu-panel'
          style={{ gridArea: '25 / 12 / span 16 / span 11' }}>Dice Roller</button>

        {/* <button onClick={() => navigate('/archives')} className='disabled flex-center data-panel red-glow scanlines-back m2 main-menu-panel' style={{ gridArea: '1 / 11 / span 8 / span 10' }}>Archives</button>
        <button onClick={() => navigate('/hanger')} className='disabled flex-center data-panel red-glow scanlines-back m2 main-menu-panel' style={{ gridArea: '9 / 11 / span 8 / span 10' }}>Hanger</button>

        <button onClick={() => navigate('/adventures')} className='disabled flex-center data-panel red-glow scanlines-back m2 main-menu-panel' style={{ gridArea: '17 / 1 / span 8 / span 20' }}>Adventures</button>

        <button onClick={() => navigate('/atlas')} className='disabled flex-center data-panel red-glow scanlines-back m2 main-menu-panel' style={{ gridArea: '25 / 1 / span 8 / span 10' }}>Atlas</button>
        <button onClick={() => navigate('/notes')} className='disabled flex-center data-panel red-glow scanlines-back m2 main-menu-panel' style={{ gridArea: '33 / 1 / span 8 / span 10' }}>Notes</button>

        <button onClick={() => navigate('/roller')} className='disabled flex-center data-panel red-glow scanlines-back m2 main-menu-panel' style={{ gridArea: '25 / 11 / span 16 / span 10' }}>Dice Roller</button> */}
      </div>
    </div>
  );
}


function mapStateToProps(state) {
  return {
    sessionToken: state.sessionToken
  };
}

export default connect(mapStateToProps)(MainMenu);
