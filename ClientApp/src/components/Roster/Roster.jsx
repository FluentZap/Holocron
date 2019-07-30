import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { navigate } from "@reach/router";
import uuid from 'uuid';
import './RosterStyles.css';

function Roster(props) {
  const { characters } = props;
  useEffect(() => {
    if (!characters) {
      props.dispatch({ type: 'SERVER_FETCH_ROSTER' })
    }
  }, [])

  console.log(characters);


  return (
    <div className='flex-center full-screen'>
      <div className='data-container'>
        <button onClick={() => navigate('/menu')} className='flex-center data-panel red-glow scanlines' style={{ gridArea: '1 / 1 / span 1 / span 4', margin: 5 }}>Menu</button>
        <div className='flex-center data-panel gray-flat roster-character-list'>
          { characters ?
            characters.map(character =>
              <div className='roster-character-box' key={uuid.v4()}>
              <div className='flex-center data-panel red-flat roster-detail-box scanlines' >{character['name']}</div>
              <div className='flex-center data-panel red-flat roster-detail-box scanlines' >{character['career']}</div>
            </div>
            )
            :
            <div>Loading</div>
          }


        </div>
        <button onClick={() => navigate('/menu')} className='flex-center data-panel red-glow scanlines' style={{ gridArea: '15 / 2 / span 2 / span 7', margin: 5 }}>Create New</button>
      </div>
    </div>
  );
}


function mapStateToProps(state) {
  return {
    characters: state.characters
  };
}

export default connect(mapStateToProps)(Roster);
