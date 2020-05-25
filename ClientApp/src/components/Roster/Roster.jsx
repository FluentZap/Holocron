import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { navigate } from "@reach/router";
import { v4 as uuid } from 'uuid';
import './RosterStyles.css';
import { Panel, ScrollPanel } from '../Panels/Panels';
import { CreateServerAction, Action } from '../../middleware/ActionBuilder';

function Roster({ characters, ds, dispatch }) {
  //Load characters
  useEffect(() => {
    // if (!characters || Object.keys(characters).length === 0) {
    dispatch(CreateServerAction(Action.FetchRoster));
    // }
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
        <ScrollPanel className='gray-flat' area={[4, 1, 34, 22]} >
          {characters && Object.entries(characters).map(([key, character]) =>
            <div className='m4 p2 data-panel red-glow scanlines-back' key={uuid()}
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
                {character.specializations.map(spec => spec !== '' ? <div className='center' key={uuid()}>{ds.specializations[spec].Name[0]}</div> : '')}
              </div>
            </div>
          )}
        </ScrollPanel>
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
