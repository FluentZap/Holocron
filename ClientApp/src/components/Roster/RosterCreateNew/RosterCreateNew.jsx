import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { connect } from 'react-redux'
import { navigate } from "@reach/router";
import uuid from 'uuid';
import './RosterCreateNewStyles.css';
import FadeInBuilder from '../../FadeInBuilder';
import CharacterCard, { TextBox } from '../CharacterCard/CharacterCard';
import CharacterStats from '../../../models/CharacterStats';
import Description from './SkillDescription';

const fadeIn = new FadeInBuilder(0, 0.2, 5);
const fadeStats = new FadeInBuilder(0, 0.2, 6);
const boxFade = new FadeInBuilder(0, 0.2, 8);

function Roster(props) {
  const { character } = props;

  const [stats, setStats] = useState(new CharacterStats());
  const [selectStat, setSelectStat] = useState('')

  return (
    <div className='flex-center full-screen'>
      <div className='data-container'>
        <button onClick={() => navigate('/menu')} className='animate-fade-in flex-center data-panel red-glow scanlines-back m2'
          style={{ gridArea: '1 / 1 / span 3 / span 7', animationDelay: fadeIn() }}>Menu</button>
        {/* <div className='animate-fade-in flex-center data-panel red-glow scanlines' style={{ gridArea: '2 / 1 / span 3 / span 9', margin: 5, animationDelay: fadeIn() }}> */}
        <CharacterCard fadeDelay={fadeIn()} stats={stats} newCharacter={true} />
        {/* </div> */}

        <div className='roster-new-characteristics-list animate-fade-in flex-center data-panel red-flat scanlines-back m2' style={{ gridArea: '14 / 1 / span 24 / span 7', animationDelay: fadeIn() }}>
          {Object.entries(stats.characteristics).map(([key, value]) =>
            <StatBox key={uuid.v4()} name={key} value={value} selected={key === selectStat} onClick={() => {
              if (selectStat === key) {
                setSelectStat('')
              } else {
                setSelectStat(key)
              }
            }} />
          )}
        </div>

        <SkillBox stats={stats} selectStat={selectStat} />
        {/* <button className='animate-fade-in flex-center data-panel red-glow scanlines-back m2'
          style={{ gridArea: '38 / 1 / span 3 / span 20', animationDelay: fadeIn() }}>Register</button> */}

        <button className='animate-fade-in flex-center data-panel red-glow scanlines-back m2'
          style={{ gridArea: '38 / 1 / span 3 / span 4', animationDelay: fadeIn() }}>Register</button>
        <button className='animate-fade-in flex-center data-panel red-glow scanlines-back m2'
          style={{ gridArea: '38 / 1 / span 3 / span 4', animationDelay: fadeIn() }}>Register</button>
        <button className='animate-fade-in flex-center data-panel red-glow scanlines-back m2'
          style={{ gridArea: '38 / 1 / span 3 / span 4', animationDelay: fadeIn() }}>Register</button>
        <button className='animate-fade-in flex-center data-panel red-glow scanlines-back m2'
          style={{ gridArea: '38 / 1 / span 3 / span 4', animationDelay: fadeIn() }}>Register</button>
        <button className='animate-fade-in flex-center data-panel red-glow scanlines-back m2'
          style={{ gridArea: '38 / 1 / span 3 / span 4', animationDelay: fadeIn() }}>Register</button>
        <button className='animate-fade-in flex-center data-panel red-glow scanlines-back m2'
          style={{ gridArea: '38 / 1 / span 3 / span 4', animationDelay: fadeIn() }}>Register</button>
      </div>
    </div >
  );
}

const StatBox = ({ name, value, selected, onClick }) => {
  let classes = 'roster-new-characteristics-box flex-center data-panel scanlines-back'
    + (selected === true ? ' orange-glow roster-detail-selected' : ' blue-glow ');
  const displayName = name.charAt(0).toUpperCase() + name.slice(1)
  return <div
    onClick={onClick}
    className={classes} >
    <div style={{ fontFamily: 'Engli-Besh' }}>{value}</div>
    {displayName}
  </div>
}


const SkillBox = ({ stats, selectStat }) => {
  const [selectSkill, setSelectSkill] = useState('')
  const skillsRef = useRef(null)

  useEffect(() => {
    setSelectSkill('');
  }, [selectStat])

  const updateSelectSkill = skills => {
    skillsRef.current.scrollTop = 0;
    if (skills.name === selectSkill) {
      setSelectSkill('')
    } else {
      setSelectSkill(skills)
    }
  }
  return (
    <div className='animate-fade-in flex-center data-panel red-flat scanlines-back m2 p2' style={{ gridArea: '14 / 8 / span 24 / span 13', justifyContent: 'start' }} >
      <div ref={skillsRef} className='animate-fade-in flex-center' style={{ display: 'block', overflowY: 'scroll', width: '99%', margin: '.5vmin 0' }} >
        {selectSkill === '' ? stats.getSkills(selectStat).map((skills) => {
          return <div key={uuid.v4()} className='animate-fade-in z-5 m2 p2 flex-left data-panel gray-flat-hover'
            style={{ animationDelay: boxFade(), marginLeft: '.5vmin', marginRight: '.5vmin' }}
            onClick={() => updateSelectSkill(skills)} >
            {skills.displayName}: {skills.value}
          </div>
        })
          :
          <>
            <div className='animate-fade-in z-5 m2 p2 flex-left data-panel orange-glow scanlines-back'
              style={{ animationDelay: boxFade(), marginLeft: '.5vmin', marginRight: '.5vmin' }}
              onClick={() => setSelectSkill('')} >
              {selectSkill.displayName}: {selectSkill.value}
            </div>
            <Description skill={selectSkill.name} />
          </>
        }
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    characters: state.characters
  };
}

export default connect(mapStateToProps)(Roster);

