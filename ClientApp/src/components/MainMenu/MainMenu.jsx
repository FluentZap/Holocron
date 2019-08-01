import React from 'react';
import { connect } from 'react-redux'
import { navigate } from "@reach/router";
import './MainMenuStyles.css';

function MainMenu(props) {
  return (
    <div className='flex-center full-screen' style={{overflow: 'hidden'}}>

      <div className='data-container scanlines-background'>
        <button onClick={() => navigate('/roster')} className='flex-center data-panel red-glow scanlines-back m3 main-menu-panel' style={{ gridArea: '1 / 1 / span 16 / span 10'}}>Roster</button>

        <button onClick={() => navigate('/archives')} className='flex-center data-panel red-glow scanlines-back m3 main-menu-panel' style={{ gridArea: '1 / 11 / span 8 / span 10'}}>Archives</button>
        <button onClick={() => navigate('/hanger')} className='flex-center data-panel red-glow scanlines-back m3 main-menu-panel' style={{ gridArea: '9 / 11 / span 8 / span 10'}}>Hanger</button>

        <button onClick={() => navigate('/adventures')} className='flex-center data-panel red-glow scanlines-back m3 main-menu-panel' style={{ gridArea: '17 / 1 / span 8 / span 20'}}>Adventures</button>

        <button onClick={() => navigate('/atlas')} className='flex-center data-panel red-glow scanlines-back m3 main-menu-panel' style={{ gridArea: '25 / 1 / span 8 / span 10'}}>Atlas</button>
        <button onClick={() => navigate('/notes')} className='flex-center data-panel red-glow scanlines-back m3 main-menu-panel' style={{ gridArea: '33 / 1 / span 8 / span 10'}}>Notes</button>

        <button onClick={() => navigate('/roller')} className='flex-center data-panel red-glow scanlines-back m3 main-menu-panel' style={{ gridArea: '25 / 11 / span 16 / span 10'}}>Dice Roller</button>
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
