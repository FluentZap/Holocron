import React from 'react';
import { connect } from 'react-redux'
import { navigate } from "@reach/router";
import { Button } from '../../Panels/Panels';

function Play({ dispatch }) {

  const logout = () => {
    dispatch({ type: 'SERVER_LOGOUT_USER' });
    navigate('/');
  }


  return (
    <div className='flex-center full-screen' style={{ overflow: 'hidden' }}>
      <div className='data-container scanlines-background'>
        <Button onClick={() => navigate('/adventure')} className='red-glow' area={[1, 1, 3, 11]}>Adventure Menu</Button>
      </div>
    </div>
  );
}


function mapStateToProps(state) {
  return {
    sessionToken: state.user.sessionToken,
  };
}

export default connect(mapStateToProps)(Play);
