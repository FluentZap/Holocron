import React from 'react';
import { connect } from 'react-redux'
import { navigate } from "@reach/router";
import './ArchivesStyles.css';

function Archives(props) {
  return (
    <div className='flex-center full-screen'>
      <div className='main-menu-root'>
        <svg viewBox="0 0 0.5625 1">
          <defs>
            {/* <clipPath id="myClip">
              <circle cx="100" cy="100" r="120" />
              <circle cx="60" cy="60" r="40" />
            </clipPath> */}
          </defs>
        </svg>


        <div className='main-menu-container'>
        <button onClick={() => navigate('/roster')} className='flex-center flat-button scanlines' style={{ gridArea: '2 / 1 / span 6 / span 4', margin: 5}}>Roster</button>
        
        <button onClick={() => navigate('/archives')} className='flex-center flat-button scanlines' style={{ gridArea: '2 / 5 / span 3 / span 5', margin: 5}}>Archives</button>
        <button onClick={() => navigate('/hanger')} className='flex-center flat-button scanlines' style={{ gridArea: '5 / 5 / span 3 / span 5', margin: 5}}>Hanger</button>
        
        <button onClick={() => navigate('/adventures')} className='flex-center flat-button scanlines' style={{ gridArea: '8 / 1 / span 3 / span 9', margin: 5}}>Adventures</button>
        
        <button onClick={() => navigate('/atlas')} className='flex-center flat-button scanlines' style={{ gridArea: '11 / 1 / span 3 / span 5', margin: 5}}>Atlas</button>
        <button onClick={() => navigate('/notes')} className='flex-center flat-button scanlines' style={{ gridArea: '14 / 1 / span 3 / span 5', margin: 5}}>Notes</button>
        
        <button onClick={() => navigate('/roller')} className='flex-center flat-button scanlines' style={{ gridArea: '11 / 6 / span 6 / span 4', margin: 5}}>Dice Roller</button>
        </div>
      </div>
    </div>
  );
}


function mapStateToProps(state) {
  return {
    messages: state
  };
}

export default connect(mapStateToProps)(Archives);
