import React, { useState, useEffect, useMemo } from 'react';
import { v4 as uuid } from 'uuid';
import { getSkillValue, getCareerSkill, recalculateXp } from '../../../models/CharacterStats';
import GetSkillSymbols from '../../Universal/Symbol';
import DescriptionBox from '../../Universal/DescriptionBox';
import { ScrollPanel } from '../../Panels/Panels';

const CareerInfo = ({ ds, career, changeCareer, specialization, changeSpecialization, character, setCharacter, setShowInfo, careerCategory, setCareerCategory }) => {

  const setCareerSkill = skill => {
    if (character.skillsCareer.includes(skill)) {
      let newCharacter = {
        ...character,
        skillsCareer: character.skillsCareer.filter(x => x !== skill),
        skillsCareerFree: character.skillsCareerFree.filter(x => x !== skill)
      };
      let [xp, skills] = recalculateXp(ds, newCharacter);
      setCharacter({ ...newCharacter, xp: xp, unusedXp: xp, skillsBuy: skills })
    } else if (character.skillsCareer.length < character.freeCareerRanks) {
      let newCharacter = {
        ...character,
        skillsCareer: [...character.skillsCareer, skill],
        skillsCareerFree: [...character.skillsCareerFree, skill]
      };
      let [xp, skills] = recalculateXp(ds, newCharacter);
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


    <button className={'flex-center data-panel scanlines-back m2 font-small ' + (careerCategory === 'CareerInfo' ? 'orange-glow' : 'red-glow')}
      onClick={() => setCareerCategory('CareerInfo')}
      style={{ gridArea: '14 / 8 / span 3 / span 4' }}>Career Info</button>

    <button className={'flex-center data-panel scanlines-back m2 font-small ' + (careerCategory === 'SpecInfo' ? 'orange-glow' : 'red-glow')}
      onClick={() => setCareerCategory('SpecInfo')}
      style={{ gridArea: '14 / 12 / span 3 / span 3' }}>Spec Info</button>

    <button className={'flex-center data-panel scanlines-back m2 font-small ' + (careerCategory === 'CareerSkills' ? 'orange-glow' : 'red-glow')}
      onClick={() => setCareerCategory('CareerSkills')}
      style={{ gridArea: '14 / 15 / span 3 / span 4' }}>Career Skills</button>

    <button className={'flex-center data-panel scanlines-back m2 font-small ' + (careerCategory === 'SpecSkills' ? 'orange-glow' : 'red-glow')}
      onClick={() => setCareerCategory('SpecSkills')}
      style={{ gridArea: '14 / 19 / span 3 / span 4' }}>Spec Skills</button>
  </>
}


const CareerList = ({ ds, changeCareer, career }) => {
  const careerCount = Object.keys(ds.careers).length;
  return <ScrollPanel className='red-flat' area={[14, 1, 12, 7]}>
    {Object.entries(ds.careers).map(([key, value], i) =>
      <div key={uuid()} className={`z-5 m2 p2 flex-center center data-panel font-small ${career === key ? 'orange-glow' : 'gray-flat-hover'}`}
        style={{ marginTop: i === 0 ? 0 : '0.5vh', marginBottom: i === careerCount - 1 ? 0 : '0.5vh' }}
        onClick={() => changeCareer(key)}
      >
        {value.Name}
      </div>
    )}
  </ScrollPanel>
}


const CareerSkills = ({ ds, character, career, setCareerSkill }) => {
  return <>
    <div className='flex-row-center data-panel red-flat scanlines-back m2 p2 font-small'
      style={{ gridArea: '17 / 8 / span 2 / span 15', justifyContent: 'center', flexFlow: 'row wrap' }}>
      Pick Career Skills {character.freeCareerRanks - character.skillsCareerFree.length} / {character.freeCareerRanks}
    </div>
    <div className='flex-row-center data-panel red-flat scanlines-back m2 p2'
      style={{ gridArea: '19 / 8 / span 19 / span 15', justifyContent: 'center', flexFlow: 'row wrap', alignItems: 'stretch' }}>
      {ds.careers[career].CareerSkills[0].Key.map(key => {
        return <div key={uuid()} className={`z-5 m2 p2 flex-center center data-panel font-small ${character.skillsCareer.includes(key) ? 'orange-glow' : 'gray-flat-hover'}`}
          style={{ width: '45%' }}
          onClick={() => {
            setCareerSkill(key);
          }}>
          {ds.skills[key].Name[0]} ({getSkillValue(character, key)}){getCareerSkill(character, key) ? ' - C' : ''}<GetSkillSymbols skill={key} {...{ character, ds }} />
        </div>
      })}
    </div>
  </>
}

const CareerInfoBox = ({ ds, career, setShowInfo }) => {
  return <ScrollPanel reset className='red-flat' area={[17, 8, 21, 15]}>
    <DescriptionBox text={ds.careers[career].Description[0]} setShowInfo={setShowInfo} />
  </ScrollPanel>
}

const SpecInfoBox = ({ ds, specialization, setShowInfo }) => {
  return <ScrollPanel reset className='red-flat' area={[17, 8, 21, 15]}>
    <DescriptionBox text={ds.specializations[specialization].Description[0]} setShowInfo={setShowInfo} />
  </ScrollPanel>
}


const Specs = ({ ds, character, career, specialization, changeSpecialization }) => {
  const specList = ds.careers[career].Specializations[0].Key;
  const specCount = specList.length;
  return <ScrollPanel className='red-flat' area={[26, 1, 12, 7]}>
    {specList.map((key, i) =>
      <div key={uuid()} className={`z-5 m2 p2 flex-center center data-panel font-small ${specialization === key ? 'orange-glow' : 'gray-flat-hover'}`}
        style={{ marginTop: i === 0 ? 0 : '.5vh', marginBottom: i === specCount - 1 ? 0 : '.5vh' }}
        onClick={() => changeSpecialization(key)} >
        <div>{ds.specializations[key].Name[0]}</div>
      </div>
    )}
  </ScrollPanel>
}

const SpecSkills = ({ ds, character, specialization, setSpecSkill }) => {
  return <>
    <div className='flex-row-center data-panel red-flat scanlines-back m2 p2 font-small'
      style={{ gridArea: '17 / 8 / span 2 / span 15', justifyContent: 'center', flexFlow: 'row wrap' }}>
      Pick Free Ranks {character.freeSpecRanks - character.skillsSpecFree.length} / {character.freeSpecRanks}
    </div>
    <div className='flex-row-center data-panel red-flat scanlines-back m2 p2'
      style={{ gridArea: '19 / 8 / span 19 / span 15', justifyContent: 'center', flexFlow: 'row wrap', alignItems: 'stretch' }}>
      {ds.specializations[specialization].CareerSkills[0].Key.map(key => {
        return <div key={uuid()} className={`z-5 m2 p2 flex-center center data-panel font-small ${character.skillsSpecFree.includes(key) ? 'orange-glow' : 'gray-flat-hover'}`}
          style={{ width: '45%' }}
          onClick={() => {
            setSpecSkill(key);
          }}>
          {ds.skills[key].Name[0]} ({getSkillValue(character, key)}){getCareerSkill(character, key) ? ' - C' : ''}<GetSkillSymbols skill={key} {...{ character, ds }} />
        </div>
      })}
    </div>
  </>
}



export default CareerInfo;