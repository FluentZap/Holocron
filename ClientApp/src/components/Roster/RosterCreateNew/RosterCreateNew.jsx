import React, { useEffect, useState, useMemo, useCallback, useRef, memo } from 'react';
import { connect } from 'react-redux'
import { navigate } from "@reach/router";
import uuid from 'uuid';
import './RosterCreateNewStyles.css';
import FadeInBuilder from '../../FadeInBuilder';
import CharacterCard, { TextBox } from '../CharacterCard/CharacterCard';
import { newCharacter, getSkills } from '../../../models/CharacterStats';
import Description from './SkillDescription';

const fadeInTime = new FadeInBuilder(0, 0.2, 5);
const fadeStats = new FadeInBuilder(0, 0.2, 6);
const boxFade = new FadeInBuilder(0, 0.2, 8);

const repeatFade = new FadeInBuilder(0, 0.2, 4);

function Roster(props) {
  const { speciesList } = props;
  console.log(speciesList);
  const [character, setCharacter] = useState(newCharacter(speciesList['HUMAN']));
  const [selectStat, setSelectStat] = useState('')

  const [category, setCategory] = useState('')

  const [species, setSpecies] = useState('')

  const changeSpecies = newSpecies => {
    setCharacter(newCharacter(speciesList[newSpecies]));
    setSpecies(newSpecies);
    console.log(character);
  }

  // console.log(speciesList);

  return (
    <div className='flex-center full-screen'>
      <div className='data-container'>
        <button onClick={() => navigate('/menu')} className='animate-fade-in flex-center data-panel red-glow scanlines-back m2'
          style={{ gridArea: '1 / 1 / span 3 / span 7', animationDelay: fadeInTime() }}>Menu</button>
        {/* <div className='animate-fade-in flex-center data-panel red-glow scanlines' style={{ gridArea: '2 / 1 / span 3 / span 9', margin: 5, animationDelay: fadeInTime() }}> */}
        <CharacterCard fadeDelay={fadeInTime()} {...{ character }} newCharacter={true} />
        {/* </div> */}

        {category === 'Stats' ?
          <>
            <div className='roster-new-characteristics-list animate-fade-in flex-center data-panel red-flat scanlines-back m2' style={{ gridArea: '14 / 1 / span 24 / span 7', animationDelay: fadeInTime() }}>
              {Object.entries(character.characteristics).map(([key, value]) =>
                <StatBox key={uuid.v4()} name={key} value={value + character.characteristicsBuy[key]} value2={character.characteristicsBuy[key]} selected={key === selectStat} onClick={() => {
                  if (selectStat === key) {
                    setSelectStat('')
                  } else {
                    setSelectStat(key)
                  }
                }} />
              )}
            </div>
            {selectStat !== '' ? <CharacteristicsBuySell {...{ setCharacter, character, selectStat }} /> : ''}
            <SkillBox {...{ character, selectStat }} />
          </>
          : category === 'Species' ?
            <>
              <SpeciesList {...{ species, changeSpecies, speciesList, fadeInTime }} />
              <SpeciesBox species={speciesList[species]} />
            </>
            : ''}
        <button className={'animate-fade-in flex-center data-panel scanlines-back m2 ' + (category === 0 ? 'orange-glow' : 'red-glow')}
          onClick={() => setCategory('Species')}
          style={{ gridArea: '38 / 1 / span 3 / span 7', animationDelay: fadeInTime() }}>Species</button>
        <button className={'animate-fade-in flex-center data-panel scanlines-back m2 ' + (category === 1 ? 'orange-glow' : 'red-glow')}
          onClick={() => setCategory('Career')}
          style={{ gridArea: '38 / 8 / span 3 / span 7', animationDelay: fadeInTime() }}>Career</button>
        <button className={'animate-fade-in flex-center data-panel scanlines-back m2 ' + (category === 2 ? 'orange-glow' : 'red-glow')}
          onClick={() => setCategory('Stats')}
          style={{ gridArea: '38 / 15 / span 3 / span 7', animationDelay: fadeInTime() }}>Stats</button>
      </div>
    </div >
  );
}



const StatBox = ({ name, value, value2, selected, onClick }) => {
  let classes = 'roster-new-characteristics-box flex-center data-panel scanlines-back'
    + (selected === true ? ' orange-glow roster-detail-selected' : ' blue-glow ');
  const displayName = name.charAt(0).toUpperCase() + name.slice(1)
  return <div
    onClick={onClick}
    className={classes} >
    {value2 ?
      <div style={{ fontFamily: 'Engli-Besh' }}>{value}[{value2}]</div> :
      <div style={{ fontFamily: 'Engli-Besh' }}>{value}</div>}
    {displayName}
  </div>
}


const SkillBox = ({ character, selectStat }) => {
  const [selectSkill, setSelectSkill] = useState('')
  const skillsRef = useRef(null)
  const characteristics = character.characteristics[selectStat];
  console.log(characteristics);
  useEffect(() => {
    setSelectSkill('');
  }, [selectStat])

  const updateSelectSkill = skill => {
    skillsRef.current.scrollTop = 0;
    if (skill === selectSkill) {
      setSelectSkill('')
    } else {
      setSelectSkill(skill)
    }
  }
  const grid = selectStat === '' ? '14 / 8 / span 24 / span 13' : '18 / 8 / span 20 / span 13'

  return (
    <div className='animate-fade-in flex-center data-panel red-flat scanlines-back m2 p2' style={{ gridArea: grid, justifyContent: 'start' }} >
      <div ref={skillsRef} className='animate-fade-in flex-center' style={{ display: 'block', overflowY: 'auto', width: '99%', margin: '.5vmin 0' }} >
        {selectSkill === '' ? getSkills(selectStat).map(skill => {
          return <div key={uuid.v4()} className='animate-fade-in z-5 m2 p2 flex-left data-panel gray-flat-hover'
            style={{ animationDelay: boxFade(), marginLeft: '.5vmin', marginRight: '.5vmin' }}
            onClick={() => updateSelectSkill(skill)} >
            {skill}: {character.skills[skill]}
          </div>
        })
          :
          <>
            <div className='z-5 m2 p2 flex-left data-panel orange-glow scanlines-back'
              style={{ animationDelay: boxFade(), marginLeft: '.5vmin', marginRight: '.5vmin' }}
              onClick={() => setSelectSkill('')} >
              {selectSkill}: {character.skills[selectSkill]}
            </div>
            {/* <Description skill={selectSkill} /> */}
          </>
        }
      </div>
    </div>
  )
}

const CharacteristicsBuySell = ({ setCharacter, character, selectStat }) => {
  const buyCost = (character.characteristics[selectStat] + character.characteristicsBuy[selectStat] + 1) * 10;
  const sellCost = (character.characteristics[selectStat] + character.characteristicsBuy[selectStat]) * 10;
  const canBuy = character.unusedXp >= buyCost;

  const buyStat = () => {
    let stat = character.characteristics[selectStat] + character.characteristicsBuy[selectStat];
    if (character.unusedXp >= buyCost && stat < 6) {
      setCharacter({
        ...character, characteristicsBuy:
        {
          ...character.characteristicsBuy,
          [selectStat]: character.characteristicsBuy[selectStat] + 1
        }, unusedXp: character.unusedXp - buyCost
      })
    }
  }

  const sellStat = () => {
    let stat = character.characteristics[selectStat] + character.characteristicsBuy[selectStat];
    if (character.characteristicsBuy[selectStat] > 0) {
      setCharacter({
        ...character, characteristicsBuy:
        {
          ...character.characteristicsBuy,
          [selectStat]: character.characteristicsBuy[selectStat] - 1
        }, unusedXp: character.unusedXp + sellCost
      })
    }
  }


  return <div className='animate-fade-in flex-row-center data-panel red-flat scanlines-back m2'
    style={{ animationDelay: boxFade(), marginLeft: '.5vmin', marginRight: '.5vmin', justifyContent: 'space-evenly', gridArea: '14 / 8 / span 4 / span 13' }}
    onClick={() => { }} >
    <div className={`animate-fade-in z-5 m2 p2 flex-left data-panel scanlines-back ${character.characteristicsBuy[selectStat] > 0 ? 'blue-glow' : 'gray-flat'}`}
      onClick={() => sellStat()}
    >+{sellCost}</div>
    <div className={`animate-fade-in z-5 m2 p2 flex-left data-panel scanlines-back ${canBuy ? 'blue-glow' : 'gray-flat'}`}
      onClick={() => buyStat()}
    >-{buyCost}</div>
  </div>
}


const SpeciesBox = ({ species }) => {
  if (species) {
    const { Name, StartingChars, StartingAttrs, Description } = species;
    const { Agility, Brawn, Cunning, Intellect, Presence, Willpower } = StartingChars[0];
    const { Experience, StrainThreshold, WoundThreshold } = StartingAttrs[0];
    return (
      <div className='animate-fade-in flex-center data-panel red-flat scanlines-back m2 p2' style={{ gridArea: '14 / 8 / span 24 / span 13', justifyContent: 'start' }} >
        <div className='flex-center' style={{ display: 'block', overflowY: 'auto', width: '99%', margin: '.5vmin 0' }} >
          <div className='animate-fade-in z-5 m2 p2 flex-left data-panel gray-flat font-small'
            style={{ animationDelay: repeatFade(), marginLeft: '.5vmin', marginRight: '.5vmin' }}>
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
            style={{ animationDelay: repeatFade(), marginLeft: '.5vmin', marginRight: '.5vmin' }}>
            <div dangerouslySetInnerHTML={{ __html: Description[0] }} />
          </div>
        </div>
      </div>
    )
  }
  return <div className='animate-fade-in flex-center data-panel red-flat scanlines-back m2 p2' style={{ gridArea: '14 / 8 / span 24 / span 13', justifyContent: 'start' }} />
}

const SpeciesList = ({ species, changeSpecies, speciesList, fadeIn }) => {
  // const fadeClass = fadeIn === true ? 'animate-fade-in ' : ' '

  return <div className={`${fadeIn} flex-center data-panel red-flat scanlines-back m2 p2`} style={{ gridArea: '14 / 1 / span 24 / span 7', justifyContent: 'start' }} >
    <div className={`${fadeIn} flex-center`} style={{ display: 'block', overflowY: 'auto', width: '99%', margin: '.5vmin 0' }} >
      {Object.entries(speciesList).map(([key, value]) =>
        <div key={uuid.v4()} className={`${fadeIn} z-5 m2 p2 flex-center center data-panel font-small ${species === key ? 'orange-glow' : 'gray-flat-hover'}`}
          style={{ animationDelay: boxFade(), marginLeft: '.5vmin', marginRight: '.5vmin' }}
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
    speciesList: state.dataSet.species,
  };
}

export default connect(mapStateToProps)(Roster);