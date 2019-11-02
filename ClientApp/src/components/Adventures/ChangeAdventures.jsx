import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { navigate } from "@reach/router";
import uuid from 'uuid';
import { Button, ScrollPanel, CRend, TextBox, Panel } from '../Panels/Panels';

function ChangeAdventures({ ds, characters, groups, dispatch }) {
  const [selectedCharacter, setSelectedCharacter] = useState('');
  const [category, setCategory] = useState('adventureList');
  const [selectedGroup, setSelectedGroup] = useState('');

  const [alertInput, setAlertInput] = useState(false);

  const [groupName, setGroupName] = useState('');
  const [connectionId, setConnectionId] = useState('');



  useEffect(() => {
    if (!characters || Object.keys(characters).length === 0) {
      dispatch({ type: 'SERVER_FETCH_ROSTER' });
    }
    if (!groups || Object.keys(groups).length === 0) {
      dispatch({ type: 'SERVER_FETCH_GROUPS' });
    }
  }, [])

  const createAdventure = () => {
    if (groupName !== '' && connectionId !== '') {
      dispatch({ type: 'SERVER_CREATE_GROUP', groupName: groupName, connectionId: connectionId })
    } else {
      setAlertInput(true);
    }
  }

  const joinAdventure = () => {
    if (groupName !== '' && connectionId !== '') {
      dispatch({ type: 'SERVER_JOIN_GROUP', groupName: groupName, connectionId: connectionId })
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
            <Panel className='red-flat' area={[7, 1, 30, 22]} />
            <TextBox onAnimationEnd={() => setAlertInput(false)} alert={alertInput} onChange={event => setGroupName(event.target.value)} area={[16, 4, 5, 16]} edit text='Group Name' />
            <TextBox alert={alertInput} onChange={event => setConnectionId(event.target.value)} area={[22, 4, 5, 16]} edit text='Adventure Id Code' />

            <Button onClick={() => createAdventure()} className='red-glow' area={[37, 1, 4, 11]}>Create Adventure</Button>
            <Button onClick={() => joinAdventure()} className={CRend(selectedCharacter === '', 'disabled', 'red-glow')} area={[37, 12, 4, 11]}>Join Adventure</Button>
          </>}

        {category === 'adventureList' &&
          <>
            {!groups && <div className="lds-dual-ring" style={{ gridArea: '18 / 8 / span 8 / span 8' }} />}
            <ScrollPanel className='gray-flat' gridArea='7 / 1 / span 30 / span 22'>
              {groups && Object.entries(groups).map(([id, group]) =>
                <div onClick={() => {
                  if (selectedGroup === id) {
                    setSelectedGroup('')
                  } else {
                    setSelectedGroup(id)
                  }
                }}
                  className={CRend(selectedGroup === id, 'orange-glow', 'red-glow', 'm4 p2 data-panel scanlines-back')} key={uuid.v4()}
                  style={{ gridTemplate: 'repeat(4, 1fr) / repeat(8, 1fr)', display: 'grid' }}>
                  <div className='flex-center data-panel m2 p2 font-small center'
                    style={{ gridArea: '1 / 1 / span 4 / span 3' }}>
                    Name:
                    <span className='gold'>{group.name}</span>
                    Adventure Id
                    <br />
                    <span className='gold'>{group.connectionId}</span>
                  </div>
                  <div className='flex-center data-panel m2 p2 font-small center'
                    style={{ gridArea: '1 / 4 / span 4 / span 5' }}>
                    Members {group.permissions && Object.keys(group.permissions).length}
                    <br />
                    Characters {group.Characters ? group.Characters.length : 0}
                  </div>
                </div>
              )}
            </ScrollPanel>
            <Button className={CRend(selectedGroup === '', 'disabled', 'red-glow')} area={[37, 1, 4, 22]}>Join</Button>
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

export default connect(mapStateToProps)(ChangeAdventures);