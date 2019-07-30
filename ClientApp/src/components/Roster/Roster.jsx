import React from 'react';
import { connect } from 'react-redux'
import { navigate } from "@reach/router";
import './RosterStyles.css';

function Roster(props) {
  return (
    <div className='flex-center full-screen'>
      {/* <div className='roster-root'> */}
        {/* <svg viewBox="0 0 0.5625 1"> */}
          {/* <defs> */}
            {/* <clipPath id="myClip">
              <circle cx="100" cy="100" r="120" />
              <circle cx="60" cy="60" r="40" />
            </clipPath> */}
          {/* </defs> */}
        {/* </svg> */}


        <div className='roster-container'>
          <button onClick={() => navigate('/menu')} className='flex-center flat-button scanlines' style={{ gridArea: '1 / 1 / span 1 / span 4', margin: 5 }}>Menu</button>
          <div className='flex-center flat-container roster-character-list'>
            <div className='flex-center flat-button roster-detail-box scanlines'/>
            <div className='flex-center flat-button roster-detail-box scanlines'/>

            <div className='flex-center flat-button roster-detail-box scanlines'/>
            <div className='flex-center flat-button roster-detail-box scanlines'/>

            <div className='flex-center flat-button roster-detail-box scanlines'/>
            <div className='flex-center flat-button roster-detail-box scanlines'/>

            <div className='flex-center flat-button roster-detail-box scanlines'/>
            <div className='flex-center flat-button roster-detail-box scanlines'/>

            <div className='flex-center flat-button roster-detail-box scanlines'/>
            <div className='flex-center flat-button roster-detail-box scanlines'/>

            <div className='flex-center flat-button roster-detail-box scanlines'/>
            <div className='flex-center flat-button roster-detail-box scanlines'/>

            <div className='flex-center flat-button roster-detail-box scanlines'/>
            <div className='flex-center flat-button roster-detail-box scanlines'/>

            <div className='flex-center flat-button roster-detail-box scanlines'/>
            <div className='flex-center flat-button roster-detail-box scanlines'/>
            <div className='flex-center flat-button roster-detail-box scanlines'/>
            <div className='flex-center flat-button roster-detail-box scanlines'/>

            <div className='flex-center flat-button roster-detail-box scanlines'/>
            <div className='flex-center flat-button roster-detail-box scanlines'/>

            <div className='flex-center flat-button roster-detail-box scanlines'/>
            <div className='flex-center flat-button roster-detail-box scanlines'/>

            <div className='flex-center flat-button roster-detail-box scanlines'/>
            <div className='flex-center flat-button roster-detail-box scanlines'/>
            <div className='flex-center flat-button roster-detail-box scanlines'/>
            <div className='flex-center flat-button roster-detail-box scanlines'/>

            <div className='flex-center flat-button roster-detail-box scanlines'/>
            <div className='flex-center flat-button roster-detail-box scanlines'/>

            <div className='flex-center flat-button roster-detail-box scanlines'/>
            <div className='flex-center flat-button roster-detail-box scanlines'/>

            <div className='flex-center flat-button roster-detail-box scanlines'/>
            <div className='flex-center flat-button roster-detail-box scanlines'/>
          </div>
        </div>
      {/* </div> */}
    </div>
  );
}


function mapStateToProps(state) {
  return {
    messages: state
  };
}

export default connect(mapStateToProps)(Roster);
