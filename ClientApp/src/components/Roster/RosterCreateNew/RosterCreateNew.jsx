import React, { useEffect, useState, useMemo, useCallback, useRef, memo } from 'react';
import { connect } from 'react-redux'
import { navigate } from "@reach/router";
import uuid from 'uuid';
import './RosterCreateNewStyles.css';
import FadeInBuilder from '../../FadeInBuilder';
import CharacterCard, { TextBox } from '../CharacterCard/CharacterCard';
import { newCharacter, getSkills, getSkillsStat, getStatValue, getSkillValue, setCharacterCareer } from '../../../models/CharacterStats';
import { SkillBuySell, CharacteristicsBuySell, SkillBox } from './SkillBox';
import FullScreenInfo from './FullScreenInfo';
import CareerInfo from './CareerInfo';

const panelFade = new FadeInBuilder(0, 0.1, 2);
const childFade = new FadeInBuilder(0.1, 0.2, 4);

function Roster({ dataSet }) {
  const ds = dataSet;

  const [character, setCharacter] = useState(newCharacter(ds.species['HUMAN']));
  const [selectStat, setSelectStat] = useState('')
  const [selectSkill, setSelectSkill] = useState('')

  const [category, setCategory] = useState('Species')

  const [species, setSpecies] = useState('')
  const [career, setCareer] = useState('SMUG')

  const [showInfo, setShowInfo] = useState('')

  const changeSpecies = newSpecies => {
    let oldCareer = character.career;
    let newChar = newCharacter(ds.species[newSpecies]);
    newChar = setCharacterCareer(ds, newChar, oldCareer)
    setCharacter(newChar);
    setSpecies(newSpecies);
  }

  const changeCareer = newCareer => {
    if (newCareer !== character.career) {
      setCharacter(setCharacterCareer(ds, character, newCareer));
      setCareer(newCareer);
    }
  }

  // console.log(speciesList);

  return (
    <div className='flex-center full-screen'>
      <div className='data-container'>
        <button onClick={() => navigate('/menu')} className='animate-fade-in flex-center data-panel red-glow scanlines-back m2'
          style={{ gridArea: '1 / 1 / span 3 / span 7', animationDelay: panelFade() }}>Menu</button>
        {/* <div className='animate-fade-in flex-center data-panel red-glow scanlines' style={{ gridArea: '2 / 1 / span 3 / span 9', margin: 5, animationDelay: fadeInTime() }}> */}
        <CharacterCard fadeDelay={panelFade()} {...{ character, ds }} newCharacter={true} />
        {/* </div> */}

        {category === 'Stats' ?
          <>
            <div className='roster-new-characteristics-list animate-fade-in flex-center data-panel red-flat scanlines-back m2' style={{ gridArea: '14 / 1 / span 24 / span 7', animationDelay: panelFade() }}>
              {Object.entries(character.characteristics).map(([key, value]) =>
                <StatBox key={uuid.v4()} name={ds.characteristics[key].Name[0]} value={value + character.characteristicsBuy[key]} value2={character.characteristicsBuy[key]} selected={key === selectStat} onClick={() => {
                  if (selectStat === key && selectSkill === '') {
                    setSelectStat('')
                    setSelectSkill('')
                  } else {
                    setSelectStat(key)
                    setSelectSkill('')
                  }
                }} />
              )}
            </div>
            {(selectSkill !== '') ?
              <SkillBuySell {...{ setCharacter, character, selectSkill, ds }} /> :
              (selectStat !== '') ?
                <CharacteristicsBuySell {...{ setCharacter, character, selectStat, ds }} /> : ''
            }

            {/* {(selectStat !== '' || selectSkill !== '') ? <CharacteristicsBuySell {...{ setCharacter, character, selectStat, selectSkill }} /> : ''} */}
            <SkillBox {...{ character, selectStat, selectSkill, setSelectSkill, ds, setShowInfo, showInfo }} />
          </>
          : category === 'Species' ?
            <>
              <SpeciesList {...{ species, changeSpecies, ds }} />
              {species ? <SpeciesBox {...{ species, ds, setShowInfo }} /> :
                <div className='animate-fade-in flex-center data-panel red-flat scanlines-back m2 p2' style={{ gridArea: '14 / 8 / span 24 / span 13', justifyContent: 'start' }} />}
            </>
            : category === 'Career' ?
              <CareerInfo {...{ career, changeCareer, ds, character, setCharacter }} />
              : ''
        }
        <button className={'animate-fade-in flex-center data-panel scanlines-back m2 ' + (category === 'Species' ? 'orange-glow' : 'red-glow')}
          onClick={() => setCategory('Species')}
          style={{ gridArea: '38 / 1 / span 3 / span 7', animationDelay: panelFade() }}>Species</button>
        <button className={'animate-fade-in flex-center data-panel scanlines-back m2 ' + (category === 'Career' ? 'orange-glow' : 'red-glow')}
          onClick={() => setCategory('Career')}
          style={{ gridArea: '38 / 8 / span 3 / span 7', animationDelay: panelFade() }}>Career</button>
        <button className={'animate-fade-in flex-center data-panel scanlines-back m2 ' + (category === 'Stats' ? 'orange-glow' : 'red-glow')}
          onClick={() => setCategory('Stats')}
          style={{ gridArea: '38 / 15 / span 3 / span 7', animationDelay: panelFade() }}>Stats</button>
        {showInfo ? <FullScreenInfo onClick={() => setShowInfo('')} text={showInfo} /> : ''}
      </div>
    </div >
  );
}



const StatBox = ({ name, value, value2, selected, onClick }) => {

  let classes = 'roster-new-characteristics-box flex-center data-panel scanlines-back'
    + (selected === true ? ' orange-glow roster-detail-selected' : ' blue-glow ');
  return <div
    onClick={onClick}
    className={classes}
  >
    {value2 ?
      <div style={{ fontFamily: 'Engli-Besh' }}>{value}[{value2}]</div> :
      <div style={{ fontFamily: 'Engli-Besh' }}>{value}</div>}
    {name}
  </div>
}

const SpeciesBox = ({ species, ds, setShowInfo }) => {
  const speciesRef = useRef(null)

  useEffect(() => {
    speciesRef.current.scrollTop = 0;
  });

  const { Name, StartingChars, StartingAttrs, Description } = ds.species[species];
  const { Agility, Brawn, Cunning, Intellect, Presence, Willpower } = StartingChars[0];
  const { Experience, StrainThreshold, WoundThreshold } = StartingAttrs[0];
  return (
    <div className='animate-fade-in flex-center data-panel red-flat scanlines-back m2 p2' style={{ gridArea: '14 / 8 / span 24 / span 13', justifyContent: 'start' }} >
      <div ref={speciesRef} className='flex-center' style={{ display: 'block', overflowY: 'auto', width: '99%', margin: '.5vmin 0' }} >
        <div className='animate-fade-in z-5 m2 p2 flex-left data-panel gray-flat font-small'
          style={{ animationDelay: childFade(), marginTop: 0 }}>
          <h3 className='m2'>{Name}</h3>
          xp {Experience}
          <p>
            Wound: {WoundThreshold} Strain: {StrainThreshold}
          </p>
          <ul className='m2' style={{ padding: 0, listStyle: 'none', alignSelf: 'start' }}>
            <li className='m2' >Brawn: {Brawn}</li>
            <li className='m2' >Agility: {Agility}</li>
            <li className='m2' >Intellect: {Intellect}</li>
            <li className='m2' >Cunning: {Cunning}</li>
            <li className='m2' >Willpower: {Willpower}</li>
            <li className='m2' >Presence: {Presence}</li>
          </ul>
        </div>
        <div className='animate-fade-in z-5 m2 p2 flex-left data-panel gray-flat font-small'
          style={{ animationDelay: childFade(), marginBottom: 0 }}>
          <div className={`animate-fade-in z-5 m2 p2 flex-center center data-panel font-small gray-flat-hover half-width`}
            onClick={() => {
              setShowInfo(Description[0]);
            }}
          >Expand</div>
          <div dangerouslySetInnerHTML={{ __html: Description[0] }} />
        </div>
      </div>
    </div>
  )
}

const SpeciesList = ({ species, changeSpecies, ds, fadeIn }) => {
  // const fadeClass = fadeIn === true ? 'animate-fade-in ' : ' '
  const speciesCount = Object.keys(ds.species).length;
  console.log(speciesCount);

  return <div className={`${fadeIn} flex-center data-panel red-flat scanlines-back m2 p2`} style={{ gridArea: '14 / 1 / span 24 / span 7', justifyContent: 'start' }} >
    <div className={`${fadeIn} flex-center`} style={{ display: 'block', overflowY: 'auto', width: '99%', margin: '.5vmin 0' }} >
      {Object.entries(ds.species).map(([key, value], i) =>
        <div key={uuid.v4()} className={`${fadeIn} z-5 m2 p2 flex-center center data-panel font-small ${species === key ? 'orange-glow' : 'gray-flat-hover'}`}
          style={{ animationDelay: childFade(), marginTop: i === 0 ? 0 : '0.5vmin', marginBottom: i === speciesCount - 1 ? 0 : '0.5vmin' }}
          onClick={() => changeSpecies(key)}
        >
          {value.Name}
        </div>
      )}
    </div>
  </div>
}

function mapStateToProps(state) {
  return {
    characters: state.characters,
    dataSet: state.dataSet,
  };
}

export default connect(mapStateToProps)(Roster);