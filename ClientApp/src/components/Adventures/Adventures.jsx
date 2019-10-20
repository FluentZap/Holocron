import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { navigate } from "@reach/router";
import uuid from 'uuid';
import './AdventuresStyles.css';
import { Button, ScrollPanel, CRend, TextBox, Panel } from '../Panels/Panels';

function Adventures({ ds, characters, dispatch }) {
  const [selectedCharacter, setSelectedCharacter] = useState('')

  useEffect(() => {
    if (!characters) {
      dispatch({ type: 'SERVER_FETCH_ROSTER' })
    }
  }, [])

  return (
    <div className='flex-center full-screen'>
      <div className='data-container'>
        <Button onClick={() => navigate('/menu')} className='red-glow' area={[1, 1, 3, 7]}>Menu</Button>
        <ScrollPanel className='gray-flat' gridArea='4 / 1 / span 22 / span 22'>
          {characters && characters.map(character =>
            <div onClick={() => setSelectedCharacter(character.id)}
              className={CRend(selectedCharacter === character.id, 'orange-glow', 'red-glow', 'm4 p2 data-panel scanlines-back')} key={uuid.v4()}
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
        <Panel className='red-flat' area={[26, 1, 11, 22]} />
        <TextBox area={[27, 4, 4, 16]} edit text='Adventure Id Code' />
        <TextBox area={[31, 4, 4, 16]} edit text='Password' type="password" />
        
        <Button className='red-glow' area={[37, 12, 4, 11]}>Join Adventure</Button>
        <Button className='red-glow' area={[37, 1, 4, 11]}>Create Adventure</Button>

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