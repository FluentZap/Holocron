import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { navigate } from "@reach/router";
import uuid from 'uuid';
import './RosterStyles.css';

function Roster({ characters, ds, dispatch }) {
  //Load characters
  useEffect(() => {
    if (!characters) {
      dispatch({ type: 'SERVER_FETCH_ROSTER' })
    }
  }, [])  

  return (
    <div className='flex-center full-screen'>
      <div className='data-container'>
        <button onClick={() => navigate('/menu')} className='flex-center data-panel red-glow scanlines-back m2'
          style={{ gridArea: '1 / 1 / span 3 / span 7', }}>Menu</button>
        <button onClick={() => navigate('/createnew')} className='flex-center data-panel red-glow scanlines-back m2'
          style={{ gridArea: '38 / 1 / span 3 / span 22', }}>Create New</button>
        {!characters && <div className="lds-dual-ring" style={{ gridArea: '18 / 8 / span 8 / span 8' }} />}

        {/* <div className='flex-center data-panel gray-flat roster-character-list m2 p4' style={{ ...getFade() }}> */}
        <div className='flex-center data-panel gray-flat scanlines-back m2 p2' style={{ justifyContent: 'start', gridArea: '4 / 1 / span 34 / span 22' }}>
          <div className='scroll-container'>
            {characters && characters.map(character =>
              <div className='m4 p2 data-panel red-glow scanlines-back' key={uuid.v4()}
                style={{ gridTemplate: 'repeat(4, 1fr) / repeat(8, 1fr)', display: 'grid' }}>
                {/* <CharacterCard fadeDelay={fadeIn()} stats={character} /> */}
                <div className='flex-center data-panel m2 p2 font-small center'
                  style={{ gridArea: '1 / 1 / span 4 / span 3' }}>
                  {character['name']}
                  <br />
                  Xp: {character['xp']}
                </div>
                <div className='flex-center data-panel m2 p2 font-small center'
                  style={{ gridArea: '1 / 4 / span 4 / span 5' }}>
                  {ds.careers[character['career']].Name[0]}
                  <br />
                  {character.specializations.split(',').map(spec => spec !== '' ? <div className='center' key={uuid.v4()}>{ds.specializations[spec].Name[0]}</div> : '')}
                </div>
              </div>
            )}
          </div>
        </div>
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

export default connect(mapStateToProps)(Roster);
