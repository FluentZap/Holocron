import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { navigate } from "@reach/router";
import uuid from 'uuid';
import './RosterStyles.css';
import FadeInBuilder from '../FadeInBuilder';
import CharacterCard from './CharacterCard/CharacterCard';
import { a } from 'react-spring'

function Roster({ characters, ds, dispatch}) {

  const [setFade, getFade] = new FadeInBuilder();

  //Load characters
  useEffect(() => {
    setFade({ opacity: 1 });
    if (!characters) {
      dispatch({ type: 'SERVER_FETCH_ROSTER' })
    }
  }, [])
  console.log(characters);
  

  return (
    <div className='flex-center full-screen'>
      <div className='data-container'>
        <a.button onClick={() => navigate('/menu')} className='flex-center data-panel red-glow scanlines-back m2'
          style={{ ...getFade(), gridArea: '1 / 1 / span 3 / span 7', }}>Menu</a.button>
        <a.button onClick={() => navigate('/createnew')} className='flex-center data-panel red-glow scanlines-back m2'
          style={{ ...getFade(), gridArea: '38 / 1 / span 3 / span 20', }}>Create New</a.button>
        {/* <a.div className='flex-center data-panel gray-flat roster-character-list m2 p4' style={{ ...getFade() }}> */}

        <div className='flex-center data-panel gray-flat scanlines-back m2 p2' style={{ justifyContent: 'start', gridArea: '4 / 1 / span 34 / span 20' }}>
          <div className='scroll-container'>

            {characters ?
              characters.map(character =>
                <div className='m4 p2 data-panel red-glow scanlines-back' key={uuid.v4()}
                  style={{ ...getFade(), gridTemplate: 'repeat(4, 1fr) / repeat(8, 1fr)', display: 'grid' }}>
                  {/* <CharacterCard fadeDelay={fadeIn()} stats={character} /> */}
                  <div className='flex-center data-panel m2 p2 font-small center'
                    style={{ gridArea: '1 / 1 / span 4 / span 3' }}>
                    {character['name']}
                    <br/> 
                    Xp: {character['xp']}
                    </div>
                  <div className='flex-center data-panel m2 p2 font-small center'
                    style={{ gridArea: '1 / 4 / span 4 / span 5' }}>
                    {ds.careers[character['career']].Name[0]}
                    <br/>
                    {character.specializations.split(',').map(spec => spec !== '' ? <div className='center' key={uuid.v4()}>{ds.specializations[spec].Name[0]}</div> : '')}                    
                    </div>
                </div>
              )
              :
              <div>Loading</div>
            }
          </div>
        </div>

        {/* </a.div> */}
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
