import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { navigate } from "@reach/router";
import uuid from 'uuid';
import { ScrollPanel, CRend } from '../../Panels/Panels';
import { CreateServerAction, Action } from '../../../middleware/ActionBuilder';

function AddCharacter({ characters, ds, dispatch }) {
  useEffect(() => {
    dispatch(CreateServerAction(Action.FetchRoster));
  }, [])


  const selectCharacter = () => {
    if (characterSelect) {
      navigate('/adventure')
    }
  }

  const [characterSelect, setCharacterSelect] = useState()

  return (
    <div className='flex-center full-screen'>
      <div className='data-container'>
        <button onClick={() => navigate('/adventure')} className='flex-center data-panel red-glow scanlines-back m2'
          style={{ gridArea: '1 / 1 / span 3 / span 7', }}>Back</button>
        <button onClick={selectCharacter} className='flex-center data-panel red-glow scanlines-back m2'
          style={{ gridArea: '38 / 1 / span 3 / span 22', }}>Choose Character</button>

        {!characters && <div className="lds-dual-ring" style={{ gridArea: '18 / 8 / span 8 / span 8' }} />}
        <ScrollPanel className='gray-flat' area={[4, 1, 34, 22]} >
          {characters && Object.entries(characters).map(([key, character]) =>
            <div className={`m4 p2 data-panel ${CRend(characterSelect === key, 'orange-glow', 'red-glow')} scanlines-back`} key={uuid.v4()}
              style={{ gridTemplate: 'repeat(4, 1fr) / repeat(8, 1fr)', display: 'grid' }}
              onClick={() => setCharacterSelect(key)}
            >
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
                {character.specializations.map(spec => spec !== '' ? <div className='center' key={uuid.v4()}>{ds.specializations[spec].Name[0]}</div> : '')}
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

export default connect(mapStateToProps)(AddCharacter);
