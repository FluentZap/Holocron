import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux'
import { navigate } from "@reach/router";
import uuid from 'uuid';
import './RosterCreateNewStyles.css';
import CharacterCard from '../CharacterCard/CharacterCard';
import { newCharacter, setCharacterCareer } from '../../../models/CharacterStats';
import { SkillBuySell, CharacteristicsBuySell, SkillBox } from './SkillBox';
import FullScreenInfo from './FullScreenInfo';
import CareerInfo from './CareerInfo';
import DescriptionBox from '../../Universal/DescriptionBox';
import ScrollPanel from '../../Panels/Panels';

// const panelFade = new FadeInBuilder(0, 0.1, 2);
// const childFade = new FadeInBuilder(0.1, 0.2, 4);


function Roster({ dataSet, dispatch }) {
  const ds = dataSet;

  const [character, setCharacter] = useState(newCharacter(ds.species['HUMAN']));
  const [selectStat, setSelectStat] = useState('')
  const [selectSkill, setSelectSkill] = useState('')

  const [category, setCategory] = useState('Species')

  const [species, setSpecies] = useState('HUMAN')
  const [career, setCareer] = useState('SMUG')
  const [specialization, setSpecialization] = useState('SCOUND')

  const [showInfo, setShowInfo] = useState('')

  const [careerCategory, setCareerCategory] = useState('CareerInfo')


  const changeSpecies = newSpecies => {
    let oldCareer = character.career;
    let newChar = newCharacter(ds.species[newSpecies], character.name);
    newChar = setCharacterCareer(ds, newChar, oldCareer)
    setCharacter(newChar);
    setSpecies(newSpecies);
  }

  const changeCareer = newCareer => {
    if (newCareer !== character.career) {
      setCharacter(setCharacterCareer(ds, character, newCareer));
      setCareer(newCareer);
      setSpecialization(ds.careers[newCareer].Specializations[0].Key[0]);
    }
  }

  const changeSpecialization = newSpec => {
    setCharacter({ ...character, specializations: [newSpec], skillsSpecFree: [], skillsSpec: [...ds.specializations[newSpec].CareerSkills[0].Key] });
    setSpecialization(newSpec);
  }

  const saveCharacter = () => {
    if (character.skillsCareerFree.length !== character.freeCareerRanks) {
      setCategory('Career')
      setCareerCategory('CareerSkills');
      setShowInfo('')
      return;
    }

    if (character.skillsSpecFree.length !== character.freeSpecRanks) {
      setCategory('Career')
      setCareerCategory('SpecSkills');
      setShowInfo('')
      return;
    }

    dispatch({ type: 'SERVER_CREATE_CHARACTER', character });
    navigate('/roster');
  }


  return (
    <div className='flex-center full-screen'>
      <div className='data-container'>
        <button onClick={() => navigate('/roster')} className='flex-center data-panel red-glow scanlines-back m2'
          style={{ gridArea: '1 / 1 / span 3 / span 7' }}>Roster</button>
        <button className='flex-center data-panel red-glow scanlines-back m2'
          style={{ gridArea: '1 / 16 / span 3 / span 7' }}
          onClick={saveCharacter}>Create</button>
        {/* <div className='flex-center data-panel red-glow scanlines' style={{ gridArea: '2 / 1 / span 3 / span 9', margin: 5, animationDelay: fadeInTime() }}> */}
        <CharacterCard {...{ character, ds, setCharacter }} newCharacter={true} />
        {/* </div> */}

        {category === 'Stats' ?
          <>
            <div className='roster-new-characteristics-list flex-center data-panel red-flat scanlines-back m2' style={{ gridArea: '14 / 1 / span 24 / span 7' }}>
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
                <div className='flex-center data-panel red-flat scanlines-back m2 p2' style={{ gridArea: '14 / 8 / span 24 / span 15', justifyContent: 'start' }} />}
            </>
            : category === 'Career' ?
              <CareerInfo {...{ career, changeCareer, specialization, changeSpecialization, ds, character, setCharacter, setShowInfo, careerCategory, setCareerCategory }} />
              : ''
        }
        <button className={'flex-center data-panel scanlines-back m2 ' + (category === 'Species' ? 'orange-glow' : 'red-glow')}
          onClick={() => setCategory('Species')}
          style={{ gridArea: '38 / 1 / span 3 / span 7' }}>Species</button>
        <button className={'flex-center data-panel scanlines-back m2 ' + (category === 'Career' ? 'orange-glow' : 'red-glow')}
          onClick={() => setCategory('Career')}
          style={{ gridArea: '38 / 8 / span 3 / span 8' }}>Career</button>
        <button className={'flex-center data-panel scanlines-back m2 ' + (category === 'Stats' ? 'orange-glow' : 'red-glow')}
          onClick={() => setCategory('Stats')}
          style={{ gridArea: '38 / 16 / span 3 / span 7' }}>Stats</button>
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
  const { Name, StartingChars, StartingAttrs, Description } = ds.species[species];
  const { Agility, Brawn, Cunning, Intellect, Presence, Willpower } = StartingChars[0];
  const { Experience, StrainThreshold, WoundThreshold } = StartingAttrs[0];
  return (
    <ScrollPanel reset className='red-flat' gridArea='14 / 8 / span 24 / span 15'>
      <div className='z-5 m2 p2 flex-left data-panel gray-flat font-small'
        style={{ marginTop: 0 }}>
        <h4 className='m2 center'>{Name}</h4>
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
      <DescriptionBox text={Description[0]} setShowInfo={setShowInfo} />
    </ScrollPanel>
  )
}

const SpeciesList = ({ species, changeSpecies, ds, fadeIn }) => {
  // const fadeClass = fadeIn === true ? 'animate-fade-in ' : ' '
  const speciesCount = Object.keys(ds.species).length;
  return (
    <ScrollPanel className='red-flat' gridArea='14 / 1 / span 24 / span 7'>
      {Object.entries(ds.species).map(([key, value], i) =>
        <div key={uuid.v4()} className={`${fadeIn} z-5 m2 p2 flex-center center data-panel font-small ${species === key ? 'orange-glow' : 'gray-flat-hover'}`}
          style={{ marginTop: i === 0 ? 0 : '0.5vh', marginBottom: i === speciesCount - 1 ? 0 : '0.5vh' }}
          onClick={() => changeSpecies(key)}
        >
          {value.Name}
        </div>
      )}
    </ScrollPanel>
  )
}

function mapStateToProps(state) {
  return {
    characters: state.characters,
    dataSet: state.dataSet,
  };
}

export default connect(mapStateToProps)(Roster);