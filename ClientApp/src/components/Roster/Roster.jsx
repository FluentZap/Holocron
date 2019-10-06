import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { navigate } from "@reach/router";
import uuid from 'uuid';
import './RosterStyles.css';
import FadeInBuilder from '../FadeInBuilder';
import CharacterCard from './CharacterCard/CharacterCard';
import { a } from 'react-spring'

function Roster(props) {
  const { characters } = props;
  const [setFade, getFade] = new FadeInBuilder();

  //Load characters
  useEffect(() => {
    setFade({ opacity: 1 });
    if (!characters) {
      props.dispatch({ type: 'SERVER_FETCH_ROSTER' })
    }
  }, [])

  return (
    <div className='flex-center full-screen'>
      <div className='data-container'>
        <a.button onClick={() => navigate('/menu')} className='flex-center data-panel red-glow scanlines-back m2'
          style={{ ...getFade(), gridArea: '1 / 1 / span 3 / span 7', }}>Menu</a.button>
        <a.button onClick={() => navigate('/createnew')} className='flex-center data-panel red-glow scanlines-back m2'
          style={{ ...getFade(), gridArea: '38 / 1 / span 3 / span 20', }}>Create New</a.button>
        <a.div className='flex-center data-panel gray-flat roster-character-list m2 p4' style={{ ...getFade() }}>
          {characters ?
            characters.map(character =>
              <div className='roster-character-box' key={uuid.v4()}>
                {/* <CharacterCard fadeDelay={fadeIn()} stats={character} /> */}
                <div className='flex-center data-panel red-flat roster-detail-box scanlines-back' >{character['name']}</div>
                <div className='flex-center data-panel red-flat roster-detail-box scanlines-back' >{character['career']}</div>
              </div>
            )
            :
            <div>Loading</div>
          }

        </a.div>
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
