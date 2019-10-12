import React, { useState, useEffect, useMemo } from 'react';
import uuid from 'uuid';
import FadeInBuilder from '../../FadeInBuilder';
import { getSkillValue, getCareerSkill, recalculateXp } from '../../../models/CharacterStats';
import GetSkillSymbols from '../../Universal/Symbol';
import DescriptionBox from '../../Universal/DescriptionBox';
import { a } from 'react-spring'

const CareerInfo = ({ ds, career, changeCareer, specialization, changeSpecialization, character, setCharacter, setShowInfo, careerCategory, setCareerCategory }) => {
  const [setFade, getFade] = new FadeInBuilder();
  useEffect(() => {
    setFade({ opacity: 1 })
  })

  const setCareerSkill = skill => {
    if (character.skillsCareer.includes(skill)) {
      let newCharacter = {
        ...character,
        skillsCareer: character.skillsCareer.filter(x => x !== skill),
        skillsCareerFree: character.skillsCareerFree.filter(x => x !== skill)
      };
      let [xp, skills] = recalculateXp(ds, newCharacter);
      console.log(xp, skills, newCharacter);
      setCharacter({ ...newCharacter, xp: xp, unusedXp: xp, skillsBuy: skills })
    } else if (character.skillsCareer.length < character.freeCareerRanks) {
      let newCharacter = {
        ...character,
        skillsCareer: [...character.skillsCareer, skill],
        skillsCareerFree: [...character.skillsCareerFree, skill]
      };
      let [xp, skills] = recalculateXp(ds, newCharacter);
      console.log(xp, skills, newCharacter);
      setCharacter({ ...newCharacter, xp: xp, unusedXp: xp, skillsBuy: skills })
    }
  }

  const setSpecSkill = skill => {
    if (character.skillsSpecFree.includes(skill)) {
      let newCharacter = {
        ...character,
        skillsSpecFree: character.skillsSpecFree.filter(x => x !== skill)
      }
      let [xp, skills] = recalculateXp(ds, newCharacter);
      setCharacter({ ...newCharacter, xp: xp, unusedXp: xp, skillsBuy: skills })
    } else if (character.skillsSpecFree.length < character.freeSpecRanks) {
      let newCharacter = {
        ...character,
        skillsSpecFree: [...character.skillsSpecFree, skill]
      }
      let [xp, skills] = recalculateXp(ds, newCharacter);
      setCharacter({ ...newCharacter, xp: xp, unusedXp: xp, skillsBuy: skills })
    }
  }

  const careerList = useMemo(() => <CareerList {...{ ds, changeCareer, career }} />, [ds, changeCareer, career]);
  const specs = useMemo(() => <Specs {...{ ds, character, career, specialization, changeSpecialization, setShowInfo }} />, [ds, character, career, specialization, changeSpecialization, setShowInfo]);

  return <>
    {careerList}
    {specs}
    {careerCategory === 'CareerSkills' ?
      <CareerSkills {...{ ds, character, career, setCareerSkill }} /> :
      careerCategory === 'CareerInfo' ?
        <CareerInfoBox {...{ ds, character, career, setCareerSkill, setShowInfo }} /> :
        careerCategory === 'SpecInfo' ?
          <SpecInfoBox {...{ ds, character, specialization, setShowInfo }} /> :
          careerCategory === 'SpecSkills' ?
            <SpecSkills {...{ ds, character, specialization, setSpecSkill }} />
            : ''

    }


    <a.button className={'flex-center data-panel scanlines-back m2 font-small ' + (careerCategory === 'CareerInfo' ? 'orange-glow' : 'red-glow')}
      onClick={() => setCareerCategory('CareerInfo')}
      style={{ ...getFade(), gridArea: '14 / 8 / span 3 / span 3' }}>Career Info</a.button>

    <a.button className={'flex-center data-panel scanlines-back m2 font-small ' + (careerCategory === 'SpecInfo' ? 'orange-glow' : 'red-glow')}
      onClick={() => setCareerCategory('SpecInfo')}
      style={{ ...getFade(), gridArea: '14 / 11 / span 3 / span 4' }}>Spec Info</a.button>

    <a.button className={'flex-center data-panel scanlines-back m2 font-small ' + (careerCategory === 'CareerSkills' ? 'orange-glow' : 'red-glow')}
      onClick={() => setCareerCategory('CareerSkills')}
      style={{ ...getFade(), gridArea: '14 / 15 / span 3 / span 3' }}>Career Skills</a.button>

    <a.button className={'flex-center data-panel scanlines-back m2 font-small ' + (careerCategory === 'SpecSkills' ? 'orange-glow' : 'red-glow')}
      onClick={() => setCareerCategory('SpecSkills')}
      style={{ ...getFade(), gridArea: '14 / 18 / span 3 / span 3' }}>Spec Skills</a.button>
  </>
}


const CareerList = ({ ds, changeCareer, career }) => {
  const [setFade, getFade] = new FadeInBuilder();
  const careerCount = Object.keys(ds.careers).length;
  useEffect(() => {
    setFade({ opacity: 1 })
  })
  return <a.div className='flex-center data-panel red-flat scanlines-back m2 p2'
    style={{ ...getFade(), gridArea: '14 / 1 / span 12 / span 7', justifyContent: 'start' }}>
    <div className={`flex-center`} style={{ display: 'block', overflowY: 'auto', width: '99%', margin: '.5vh 0' }} >

      {Object.entries(ds.careers).map(([key, value], i) =>
        <a.div key={uuid.v4()} className={`z-5 m2 p2 flex-center center data-panel font-small ${career === key ? 'orange-glow' : 'gray-flat-hover'}`}
          style={{ ...getFade(), marginTop: i === 0 ? 0 : '0.5vh', marginBottom: i === careerCount - 1 ? 0 : '0.5vh' }}
          onClick={() => changeCareer(key)}
        >
          {value.Name}
        </a.div>
      )}
    </div>
  </a.div>
}


const CareerSkills = ({ ds, character, career, setCareerSkill }) => {
  const [setFade, getFade] = new FadeInBuilder();
  useEffect(() => {
    setFade({ opacity: 1 })
  })
  return <>
    <a.div className='flex-row-center data-panel red-flat scanlines-back m2 p2 font-small'
      style={{ ...getFade(), gridArea: '17 / 8 / span 2 / span 13', justifyContent: 'center', flexFlow: 'row wrap' }}>
      Pick Career Skills {character.freeCareerRanks - character.skillsCareerFree.length} / {character.freeCareerRanks}
    </a.div>
    <a.div className='flex-row-center data-panel red-flat scanlines-back m2 p2'
      style={{ ...getFade(), gridArea: '19 / 8 / span 19 / span 13', justifyContent: 'center', flexFlow: 'row wrap', alignItems: 'stretch' }}>
      {ds.careers[career].CareerSkills[0].Key.map(key => {
        return <a.div key={uuid.v4()} className={`z-5 m2 p2 flex-center center data-panel font-small ${character.skillsCareer.includes(key) ? 'orange-glow' : 'gray-flat-hover'}`}
          style={{ ...getFade(), width: '45%' }}
          onClick={() => {
            setCareerSkill(key);
          }}>
          {ds.skills[key].Name[0]} ({getSkillValue(character, key)}){getCareerSkill(character, key) ? ' - C' : ''}<GetSkillSymbols skill={key} {...{ character, ds }} />
        </a.div>
      })}
    </a.div>
  </>
}

const CareerInfoBox = ({ ds, career, setShowInfo }) => {
  const [setFade, getFade] = new FadeInBuilder();
  useEffect(() => {
    setFade({ opacity: 1 })
  })
  return <>
    <a.div className='flex-center data-panel red-flat scanlines-back m2 p2'
      style={{ ...getFade(), gridArea: '17 / 8 / span 21 / span 13', justifyContent: 'center' }}>
      <div className='flex-center' style={{ display: 'block', overflowY: 'auto', width: '99%', margin: '.5vh 0' }} >
        <DescriptionBox text={ds.careers[career].Description[0]} setShowInfo={setShowInfo} />
      </div>
    </a.div>
  </>
}

const SpecInfoBox = ({ ds, specialization, setShowInfo }) => {
  const [setFade, getFade] = new FadeInBuilder();
  useEffect(() => {
    setFade({ opacity: 1 })
  })
  return <>
    <a.div className='flex-center data-panel red-flat scanlines-back m2 p2'
      style={{ ...getFade(), gridArea: '17 / 8 / span 21 / span 13', justifyContent: 'center' }}>
      <div className='flex-center' style={{ display: 'block', overflowY: 'auto', width: '99%', margin: '.5vh 0' }} >
        <DescriptionBox text={ds.specializations[specialization].Description[0]} setShowInfo={setShowInfo} />
      </div>
    </a.div>
  </>
}


const Specs = ({ ds, character, career, specialization, changeSpecialization }) => {
  const specList = ds.careers[career].Specializations[0].Key;
  const specCount = specList.length;
  return <>
    <div className='flex-center data-panel red-flat scanlines-back m2 p2' style={{ gridArea: '26 / 1 / span 12 / span 7', justifyContent: 'start' }} >
      <div className='flex-center' style={{ display: 'block', overflowY: 'auto', width: '99%', margin: '.5vh 0' }} >
        {specList.map((key, i) =>
          <div key={uuid.v4()} className={`z-5 m2 p2 flex-center center data-panel font-small ${specialization === key ? 'orange-glow' : 'gray-flat-hover'}`}
            style={{ marginTop: i === 0 ? 0 : '.5vh', marginBottom: i === specCount - 1 ? 0 : '.5vh' }}
            onClick={() => changeSpecialization(key)} >
            <div>{ds.specializations[key].Name[0]}</div>
          </div>
        )}
      </div>
    </div>
  </>
}

const SpecSkills = ({ ds, character, specialization, setSpecSkill }) => {
  const [setFade, getFade] = new FadeInBuilder();
  useEffect(() => {
    setFade({ opacity: 1 })
  })
  return <>
    <a.div className='flex-row-center data-panel red-flat scanlines-back m2 p2 font-small'
      style={{ ...getFade(), gridArea: '17 / 8 / span 2 / span 13', justifyContent: 'center', flexFlow: 'row wrap' }}>
      Pick Free Ranks {character.freeSpecRanks - character.skillsSpecFree.length} / {character.freeSpecRanks}
    </a.div>
    <a.div className='flex-row-center data-panel red-flat scanlines-back m2 p2'
      style={{ ...getFade(), gridArea: '19 / 8 / span 19 / span 13', justifyContent: 'center', flexFlow: 'row wrap', alignItems: 'stretch' }}>
      {ds.specializations[specialization].CareerSkills[0].Key.map(key => {
        return <a.div key={uuid.v4()} className={`z-5 m2 p2 flex-center center data-panel font-small ${character.skillsSpecFree.includes(key) ? 'orange-glow' : 'gray-flat-hover'}`}
          style={{ ...getFade(), width: '45%' }}
          onClick={() => {
            setSpecSkill(key);
          }}>
          {ds.skills[key].Name[0]} ({getSkillValue(character, key)}){getCareerSkill(character, key) ? ' - C' : ''}<GetSkillSymbols skill={key} {...{ character, ds }} />
        </a.div>
      })}
    </a.div>
  </>
}



export default CareerInfo;