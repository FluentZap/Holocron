import React from 'react';
import { connect } from 'react-redux'
import { navigate } from "@reach/router";
import { Button } from '../../Panels/Panels';
import { CreateServerAction, Action } from '../../../middleware/ActionBuilder';

function Inventory({ dispatch }) {

  const logout = () => {
    dispatch(CreateServerAction(Action.LogoutUser));
    navigate('/');
  }


  return (
    <div className='flex-center full-screen' style={{ overflow: 'hidden' }}>
      <div className='data-container scanlines-background'>
        <Button onClick={() => navigate('/changeadventures')} className='red-glow' area={[1, 8, 3, 8]}>Adventure</Button>
        <Button onClick={() => logout()} className='red-glow' area={[1, 16, 3, 7]}>Logout</Button>
        <Button onClick={() => navigate('/menu')} className='red-glow' area={[1, 1, 3, 7]}>Menu</Button>
      </div>
    </div>
  );
}


function mapStateToProps(state) {
  return {
    sessionToken: state.user.sessionToken,
  };
}

export default connect(mapStateToProps)(Inventory);
