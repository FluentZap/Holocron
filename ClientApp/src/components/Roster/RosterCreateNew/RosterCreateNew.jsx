import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { navigate } from "@reach/router";
import uuid from 'uuid';
import './RosterCreateNewStyles.css';
import FadeInBuilder from '../../FadeInBuilder';
import CharacterCard, { TextBox } from '../CharacterCard/CharacterCard';


const fadeIn = new FadeInBuilder(0, 0.3, 5);
const fadeStats = new FadeInBuilder(0.3, 0.5, 6);
const boxFade = new FadeInBuilder(0.3, 0.5, 8);

function Roster(props) {
  const { character } = props;

  const [stats, setStats] = useState({
    name: 'Scoundrel',
    xp: 110,
    unusedXp: 110,
    credits: 500,
    species: 'Droid',
    career: 'Smuggler',
    specializations: 'Charmer,Pilot',
    wound: 0,
    woundThreshold: 10,
    strain: 0,
    strainThreshold: 10,
    soak: 2,
    brawn: 3,
    agility: 1,
    intellect: 2,
    cunning: 2,
    willpower: 2,
    presence: 2,
    skills: {
      astrogation: 0,
      athletics: 0,
      brawl: 0,
      charm: 0,
      coercion: 0,
      computers: 0,
      cool: 0,
      coordination: 0,
      coreWorlds: 0,
      deception: 0,
      discipline: 0,
      gunnery: 0,
      leadership: 0,
      lightsaber: 0,
      lore: 0,
      mechanics: 0,
      medicine: 0,
      melee: 0,
      negotiation: 0,
      outerRim: 0,
      perception: 0,
      pilotingPlanetary: 0,
      pilotingSpace: 0,
      rangedHeavy: 0,
      rangedLight: 0,
      resilience: 0,
      skulduggery: 0,
      stealth: 0,
      streatwise: 0,
      survival: 0,
      underworld: 0,
      vigilance: 0,
      xenology: 0,
      warfare: 0,
      cybernetics: 0,
    }
  });

  const [selectStat, setSelectStat] = useState('')

  const StatBox = ({ name, value, selected }) => {
    let classes = 'roster-new-characteristics-box flex-center data-panel scanlines-back'
      + ((name === selectStat) ? ' orange-glow roster-detail-selected' : ' blue-glow ');
    return <div onClick={() => { setSelectStat(name) }} className={classes} >
      <div style={{ fontFamily: 'Engli-Besh' }}>{value}</div>
      {name}
    </div>
  }

  return (
    <div className='flex-center full-screen'>
      <div className='data-container'>
        <button onClick={() => navigate('/menu')} className='animate-fade-in flex-center data-panel red-glow scanlines-back m2'
          style={{ gridArea: '1 / 1 / span 3 / span 7', animationDelay: fadeIn() }}>Menu</button>
        {/* <div className='animate-fade-in flex-center data-panel red-glow scanlines' style={{ gridArea: '2 / 1 / span 3 / span 9', margin: 5, animationDelay: fadeIn() }}> */}
        <CharacterCard fadeDelay={fadeIn()} stats={stats} newCharacter={true} />
        {/* </div> */}


        <div className='roster-new-characteristics-list animate-fade-in flex-center data-panel red-flat scanlines-back m2' style={{ gridArea: '14 / 1 / span 24 / span 7', animationDelay: fadeIn() }}>
          <StatBox name={'Brawn'} value={stats.brawn} />
          <StatBox name={'Agility'} value={stats.agility} />
          <StatBox name={'Intellect'} value={stats.intellect} />
          <StatBox name={'Cunning'} value={stats.cunning} />
          <StatBox name={'Willpower'} value={stats.willpower} />
          <StatBox name={'Presence'} value={stats.presence} />
        </div>

        {/* <div className='animate-fade-in roster-skills-card' style={{ gridArea: '14 / 8 / span 24 / span 13', animationDelay: fadeIn() }}> */}

        <div className='animate-fade-in flex-center data-panel red-flat scanlines-back m2' style={{ gridArea: '14 / 8 / span 24 / span 13', display: 'block', overflow: 'auto' }} >
          {Object.entries(stats.skills).map((value, i) => {
            return <div key={uuid.v4()} className='animate-fade-in z-5 m2 p2 flex-left data-panel gray-flat'
              style={{ animationDelay: boxFade() }}>
              {value[0]}: {value[1]}
            </div>
          })
          }
        </div>
        <button className='animate-fade-in flex-center data-panel red-glow scanlines-back m2'
          style={{ gridArea: '38 / 1 / span 3 / span 20', animationDelay: fadeIn() }}>Register</button>
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
