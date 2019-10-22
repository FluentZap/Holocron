import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { navigate } from "@reach/router";
import uuid from 'uuid';
import './AdventuresStyles.css';
import { Button, ScrollPanel, CRend, TextBox, Panel } from '../Panels/Panels';

function Adventures({ ds, characters, groups, dispatch }) {
  const [selectedCharacter, setSelectedCharacter] = useState('')
  const [category, setCategory] = useState('adventureList')

  const [alertInput, setAlertInput] = useState(false)

  const [groupName, setGroupName] = useState('')
  const [connectionId, setConnectionId] = useState('')



  useEffect(() => {
    // if (!characters) {
      // dispatch({ type: 'SERVER_FETCH_ROSTER' })
    // }
    console.log(groups);
    
  }, [])

  const createAdventure = () => {
    if (groupName !== '' && connectionId !== '') {
      dispatch({ type: 'SERVER_CREATE_GROUP', groupName: groupName, connectionId: connectionId })
    } else {
      setAlertInput(true);
    }
  }

  return (
    <div className='flex-center full-screen'>
      <div className='data-container'>
        <Button onClick={() => navigate('/menu')} className='red-glow' area={[1, 1, 3, 7]}>Menu</Button>

        <Button onClick={() => setCategory('adventureList')} className={CRend(category === 'adventureList', 'orange-glow', 'red-glow')} area={[4, 1, 3, 11]}>Adventures</Button>
        <Button onClick={() => setCategory('joinAdventure')} className={CRend(category === 'joinAdventure', 'orange-glow', 'red-glow')} area={[4, 12, 3, 11]}>New</Button>
        {category === 'joinAdventure' &&
          <>
            <ScrollPanel className='gray-flat' gridArea='18 / 1 / span 19 / span 22'>
              {characters && characters.map(character =>
                <div onClick={() => {
                  if (selectedCharacter === character.id) {
                    setSelectedCharacter('')
                  } else {
                    setSelectedCharacter(character.id)
                  }
                }}
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
            <Panel className='red-flat' area={[7, 1, 11, 22]} />
            <TextBox onAnimationEnd={() => setAlertInput(false)} alert={alertInput} onChange={event => setGroupName(event.target.value)} area={[8, 4, 4, 16]} edit text='Group Name' />
            <TextBox alert={alertInput} onChange={event => setConnectionId(event.target.value)} area={[12, 4, 4, 16]} edit text='Adventure Id Code' />

            <Button onClick={() => createAdventure()} className='red-glow' area={[37, 1, 4, 11]}>Create Adventure</Button>
            <Button className={CRend(selectedCharacter === '', 'disabled', 'red-glow')} area={[37, 12, 4, 11]}>Join Adventure</Button>
          </>}

        {category === 'adventureList' &&
          <>
            <ScrollPanel className='gray-flat' gridArea='7 / 1 / span 30 / span 22'>
            </ScrollPanel>
            <Button className='red-glow' area={[37, 1, 4, 22]}>Login</Button>
          </>}


      </div>
    </div>
  );
}


function mapStateToProps(state) {
  return {
    ds: state.dataSet,
    characters: state.characters,
    groups: state.groups
  };
}

export default connect(mapStateToProps)(Adventures);