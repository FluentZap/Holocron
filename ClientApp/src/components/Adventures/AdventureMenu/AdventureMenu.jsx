import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { navigate } from "@reach/router";
// import './MainMenuStyles.css';
import { Button } from '../../Panels/Panels';

function AdventureMenu({ currentAdventure, dispatch }) {

  // const [springs, set, stop] = useSprings(4, index => ({ opacity: 1 }))  
  // const [panelFade, set] = useSpring(() => ({ opacity: 0, config: { mass: 1, tension: 280, friction: 1000 } }))
  // if ()

  const logout = () => {
    dispatch({ type: 'SERVER_LOGOUT_USER' });
    navigate('/');
  }


  return (
    <div className='flex-center full-screen' style={{ overflow: 'hidden' }}>
      <div className='data-container scanlines-background'>
        <Button onClick={() => navigate('/changeadventures')} className='red-glow' area={[1, 8, 3, 8]}>Adventure</Button>
        <Button onClick={() => logout()} className='red-glow' area={[1, 16, 3, 7]}>Logout</Button>
        <Button onClick={() => navigate('/menu')} className='red-glow' area={[1, 1, 3, 7]}>Menu</Button>
        <Button onClick={() => navigate('/adventure/inventory')} className='red-glow' area={[4, 1, 14, 11]}>Inventory</Button>
        <Button onClick={() => navigate('/adventure/store')} className='red-glow' area={[4, 12, 14, 11]}>Store</Button>
        <Button onClick={() => navigate('/adventure/play')} className='red-glow' area={[18, 1, 9, 22]}>Play</Button>
        <Button onClick={() => navigate('/adventure/ship')} className='red-glow' area={[27, 1, 16, 11]}>Ship</Button>
        <Button onClick={() => navigate('/adventure/notes')} className='red-glow' area={[27, 12, 16, 11]}>Notes</Button>
      </div>
    </div>
  );
}


function mapStateToProps(state) {
  return {
    sessionToken: state.user.sessionToken,
    currentAdventure: state.currentAdventure
  };
}

export default connect(mapStateToProps)(AdventureMenu);
