import React from 'react';
import { connect } from 'react-redux'
import { navigate } from "@reach/router";
import './AdventuresStyles.css';
import { Button } from '../Panels/Panels';

function Adventures() {
  return (
    <div className='flex-center full-screen'>
      <div className='data-container'>
        <Button onClick={() => navigate('/menu')} className='red-glow' gridArea='1 / 1 / span 3 / span 7'>Menu</Button>

      </div>
    </div>
  );
}


function mapStateToProps(state) {
  return {
    characters: state.characters,
    ds: state.dataSet,
  };
}

export default connect(mapStateToProps)(Adventures);
