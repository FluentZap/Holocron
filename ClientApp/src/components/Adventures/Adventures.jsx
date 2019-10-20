import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { navigate } from "@reach/router";
import uuid from 'uuid';
import './AdventuresStyles.css';
import { Button, Panel, ScrollPanel } from '../Panels/Panels';

function Adventures({ ds, characters, dispatch }) {
  const [selectedCharacter, setSelectedCharacter] = useState('')


  useEffect(() => {
    if (!characters) {
      dispatch({ type: 'SERVER_FETCH_ROSTER' })
    }    
  }, [])
  console.log(characters);

  return (
    <div className='flex-center full-screen'>
      <div className='data-container'>
        <Button onClick={() => navigate('/menu')} className='red-glow' gridArea='1 / 1 / span 3 / span 7'>Menu</Button>
        <ScrollPanel className='gray-flat' gridArea='4 / 1 / span 17 / span 22'>
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

export default connect(mapStateToProps)(Adventures);
