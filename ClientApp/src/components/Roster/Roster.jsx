import React from 'react';
import { connect } from 'react-redux'
import { navigate } from "@reach/router";
import './RosterStyles.css';

function Roster(props) {
  return (
    <div className='flex-center full-screen'>
      <div className='roster-container'>
        <button onClick={() => navigate('/menu')} className='flex-center data-panel red-glow scanlines' style={{ gridArea: '1 / 1 / span 1 / span 4', margin: 5 }}>Menu</button>
        <div className='flex-center data-panel gray-flat roster-character-list'>
          <div className='flex-center data-panel red-glow roster-detail-box scanlines' />
          <div className='flex-center data-panel red-glow roster-detail-box scanlines' />
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

export default connect(mapStateToProps)(Roster);
