import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { navigate } from "@reach/router";
import uuid from 'uuid';
import './RosterCreateNewStyles.css';
import FadeInBuilder from '../../FadeInBuilder';
import CharacterCard from '../CharacterCard/CharacterCard';


const fadeIn = new FadeInBuilder(0, 0.3, 6);
const fadeStats = new FadeInBuilder(0.3, 0.5, 6);

function Roster(props) {
  const { character } = props;

  const [stats, setStats] = useState({
    name: 'Scoundrel',
    xp: 110,
    unusedXp: 110,
    credits: 500,
    species: 'Droid',
    career: 'Smuggler',
    specializations:['Charmer', 'Pilot'],
    wound: 0,
    woundThreshold: 10,
    strain: 0,
    strainThreshold: 10,
    brawn: 3,
    agility: 1,
    intellect: 2,
    cunning: 2,
    willpower: 2,
    presence: 2,
  });

  const [selectStat, setSelectStat] = useState('')

  const StatBox = ({ name, value }) => {
    let classes = 'roster-new-characteristics-box flex-center data-panel scanlines-back font-small';    

    return name === selectStat ?
    // return 1 === 1 ?
      <div onClick={() => { setSelectStat(name) }} className={classes + ' orange-glow roster-detail-selected'}>
        {/* <div className={'roster-new-characteristics-details'}> */}
          {name} {value}
          <br />
          {(value + 1) * 10} xp
  
        {/* </div> */}
        <div className={'roster-new-characteristics-details'}>
          <div className={'flex-center data-panel orange-glow scanlines-back roster-new-characteristics-modifier-box'}>Stuff</div>
          <div className={'flex-center data-panel orange-glow scanlines-back roster-new-characteristics-modifier-box'}>Stuff</div>
        </div>
      </div>
      :
      <div onClick={() => { setSelectStat(name) }} className={classes + ' blue-glow '} style={{animationDelay: fadeStats()}}>
        {name} {value}
        <br />
        {(value + 1) * 10} xp
    </div>
  }


  return (
    <div className='flex-center full-screen'>
      <div className='data-container'>
        <button onClick={() => navigate('/menu')} className='font-small animate-fade-in flex-center data-panel red-glow scanlines-back m2' 
        style={{ gridArea: '1 / 1 / span 2 / span 7', animationDelay: fadeIn() }}>Menu</button>
        {/* <div className='animate-fade-in flex-center data-panel red-glow scanlines' style={{ gridArea: '2 / 1 / span 3 / span 9', margin: 5, animationDelay: fadeIn() }}> */}
        <CharacterCard fadeDelay={fadeIn()} stats={stats}/>
        {/* </div> */}
        
      
        <div className='roster-new-characteristics-list animate-fade-in flex-center data-panel red-flat scanlines-back m2' style={{ gridArea: '13 / 1 / span 28 / span 7', animationDelay: fadeIn() }}>
          <StatBox name={'Brawn'} value={stats.brawn} />
          <StatBox name={'Agility'} value={stats.agility} />
          <StatBox name={'Intellect'} value={stats.intellect} />
          <StatBox name={'Cunning'} value={stats.cunning} />
          <StatBox name={'Willpower'} value={stats.willpower} />
          <StatBox name={'Presence'} value={stats.presence} />
        </div>


        <div className='animate-fade-in flex-center data-panel red-glow scanlines-back m2' style={{ gridArea: '13 / 8 / span 8 / span 13', animationDelay: fadeIn() }} />
        <div className='animate-fade-in flex-center data-panel red-glow scanlines-back m2' style={{ gridArea: '21 / 8 / span 8 / span 13', animationDelay: fadeIn() }} />
        <div className='animate-fade-in flex-center data-panel red-glow scanlines-back m2' style={{ gridArea: '29 / 8 / span 8 / span 13', animationDelay: fadeIn() }} />
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
