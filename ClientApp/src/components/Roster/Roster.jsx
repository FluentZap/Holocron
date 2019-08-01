import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { navigate } from "@reach/router";
import uuid from 'uuid';
import './RosterStyles.css';
import FadeInBuilder from '../FadeInBuilder';
import CharacterCard from './CharacterCard/CharacterCard';

const fadeIn = new FadeInBuilder(0, 0.3, 3);

function Roster(props) {
  const { characters } = props;

  //Load characters
  useEffect(() => {
    if (!characters) {
      props.dispatch({ type: 'SERVER_FETCH_ROSTER' })
    }
  }, [])

  return (
    <div className='flex-center full-screen'>
      <div className='data-container'>
        <button onClick={() => navigate('/menu')} className='animate-fade-in flex-center data-panel red-glow scanlines-back m2'
          style={{ gridArea: '1 / 1 / span 3 / span 7', animationDelay: fadeIn() }}>Menu</button>
        <button onClick={() => navigate('/createnew')} className='animate-fade-in flex-center data-panel red-glow scanlines-back m2'
          style={{ gridArea: '38 / 1 / span 3 / span 20', animationDelay: fadeIn() }}>Create New</button>
        <div className='animate-fade-in flex-center data-panel gray-flat roster-character-list m2 p4' style={{ animationDelay: fadeIn() }}>
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


        </div>
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
