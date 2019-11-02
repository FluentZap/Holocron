import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { navigate } from "@reach/router";
import './MainMenuStyles.css';
import { Button } from '../Panels/Panels';

function MainMenu({ currentAdventure, dispatch }) {  
  // const [springs, set, stop] = useSprings(4, index => ({ opacity: 1 }))  
  // const [panelFade, set] = useSpring(() => ({ opacity: 0, config: { mass: 1, tension: 280, friction: 1000 } }))

  const logout = () => {
    dispatch({ type: 'SERVER_LOGOUT_USER' });
    navigate('/');
  }


  return (
    <div className='flex-center full-screen' style={{ overflow: 'hidden' }}>
      <div className='data-container scanlines-background'>
        <Button onClick={() => currentAdventure !== null ? navigate('/adventure') : navigate('/changeadventure')} className='red-glow' area={[1, 8, 3, 8]}>Adventure</Button>
        <Button onClick={() => logout()} className='red-glow' area={[1, 16, 3, 7]}>Logout</Button>
        <Button onClick={() => navigate('/roster')} className='red-glow' area={[4, 1, 14, 11]}>Roster</Button>
        <Button onClick={() => { }} className='disabled' area={[4, 12, 7, 11]}>Archives</Button>
        <Button onClick={() => { }} className='disabled' area={[11, 12, 7, 11]}>Hanger</Button>
        {currentAdventure !== null ? 
        <Button onClick={() => navigate('/adventure')} className='red-glow' area={[18, 1, 9, 22]}>Continue Adventure</Button> :
          <Button className='disabled' area={[18, 1, 9, 22]}>Continue Adventure</Button>}
        <Button onClick={() => navigate('/changeadventures')} className='red-glow' area={[27, 1, 7, 11]}>New Adventure</Button>
        <Button onClick={() => { }} className='disabled' area={[34, 1, 7, 11]}>Atlas</Button>
        <Button onClick={() => { }} className='disabled' area={[27, 12, 16, 11]}>Dice Roller</Button>
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

export default connect(mapStateToProps)(MainMenu);
