import React, { useState } from 'react';
import uuid from 'uuid';
import FadeInBuilder from '../../FadeInBuilder';
import { getSkillValue, getCareerSkill } from '../../../models/CharacterStats';
import GetSkillSymbols from '../../Universal/Symbol';
import DescriptionBox from '../../Universal/DescriptionBox';

const panelFade = new FadeInBuilder(0, 0.1, 2);
const childFade = new FadeInBuilder(0.1, 0.2, 4);

const CareerInfo = ({ ds, career, changeCareer, specialization, changeSpecialization, character, setCharacter, setShowInfo }) => {
  const careerCount = Object.keys(ds.careers).length;
  const [careerCategory, setCareerCategory] = useState('CareerInfo')

  const setCareerSkill = skill => {
    if (character.skillsCareer.includes(skill)) {
      setCharacter({
        ...character,
        skillsCareer: character.skillsCareer.filter(x => x !== skill),
        skillsCareerFree: character.skillsCareerFree.filter(x => x !== skill)
      })
    } else if (character.skillsCareer.length < character.freeCareerRanks) {
      setCharacter({
        ...character,
        skillsCareer: [...character.skillsCareer, skill],
        skillsCareerFree: [...character.skillsCareerFree, skill]
      })
    }
  }

  const setSpecSkill = skill => {
    if (character.skillsSpecFree.includes(skill)) {
      setCharacter({
        ...character,
        // skillsSpec: character.skillsSpec.filter(x => x !== skill),
        skillsSpecFree: character.skillsSpecFree.filter(x => x !== skill)
      })
    } else if (character.skillsSpecFree.length < character.freeSpecRanks) {
      setCharacter({
        ...character,
        // skillsSpec: [...character.skillsSpec, skill],
        skillsSpecFree: [...character.skillsSpecFree, skill]
      })
    }
  }


  return <>
    <div className='flex-center data-panel red-flat scanlines-back m2 p2'
      style={{ gridArea: '14 / 1 / span 12 / span 7', justifyContent: 'start', animationDelay: panelFade() }}>
      <div className={`flex-center`} style={{ display: 'block', overflowY: 'auto', width: '99%', margin: '.5vmin 0' }} >

        {Object.entries(ds.careers).map(([key, value], i) =>
          <div key={uuid.v4()} className={`z-5 m2 p2 flex-center center data-panel font-small ${career === key ? 'orange-glow' : 'gray-flat-hover'}`}
            style={{ animationDelay: childFade(), marginTop: i === 0 ? 0 : '0.5vmin', marginBottom: i === careerCount - 1 ? 0 : '0.5vmin' }}
            onClick={() => changeCareer(key)}
          >
            {value.Name}
          </div>
        )}
      </div>
    </div>

    <Specs {...{ ds, character, career, specialization, changeSpecialization, setShowInfo }} />
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
      style={{ gridArea: '14 / 8 / span 3 / span 3', animationDelay: panelFade() }}>Career Info</button>

    <button className={'flex-center data-panel scanlines-back m2 font-small ' + (careerCategory === 'SpecInfo' ? 'orange-glow' : 'red-glow')}
      onClick={() => setCareerCategory('SpecInfo')}
      style={{ gridArea: '14 / 11 / span 3 / span 4', animationDelay: panelFade() }}>Spec Info</button>

    <button className={'flex-center data-panel scanlines-back m2 font-small ' + (careerCategory === 'CareerSkills' ? 'orange-glow' : 'red-glow')}
      onClick={() => setCareerCategory('CareerSkills')}
      style={{ gridArea: '14 / 15 / span 3 / span 3', animationDelay: panelFade() }}>Career Skills</button>

    <button className={'flex-center data-panel scanlines-back m2 font-small ' + (careerCategory === 'SpecSkills' ? 'orange-glow' : 'red-glow')}
      onClick={() => setCareerCategory('SpecSkills')}
      style={{ gridArea: '14 / 18 / span 3 / span 3', animationDelay: panelFade() }}>Spec Skills</button>
  </>
}




const CareerSkills = ({ ds, character, career, setCareerSkill }) => {
  return <>
    <div className='flex-row-center data-panel red-flat scanlines-back m2 p2 font-small'
      style={{ gridArea: '17 / 8 / span 2 / span 13', justifyContent: 'center', animationDelay: panelFade(), flexFlow: 'row wrap' }}>
      Pick Career Skills {character.freeCareerRanks - character.skillsCareerFree.length} / {character.freeCareerRanks}
    </div>
    <div className='flex-row-center data-panel red-flat scanlines-back m2 p2'
      style={{ gridArea: '19 / 8 / span 19 / span 13', justifyContent: 'center', animationDelay: panelFade(), flexFlow: 'row wrap', alignItems: 'stretch' }}>
      {ds.careers[career].CareerSkills[0].Key.map(key => {
        return <div key={uuid.v4()} className={`z-5 m2 p2 flex-center center data-panel font-small ${character.skillsCareer.includes(key) ? 'orange-glow' : 'gray-flat-hover'}`}
          style={{ animationDelay: childFade(), width: '45%' }}
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
  return <>
    <div className='flex-center data-panel red-flat scanlines-back m2 p2'
      style={{ gridArea: '17 / 8 / span 21 / span 13', justifyContent: 'center', animationDelay: panelFade() }}>
      <div className='flex-center' style={{ display: 'block', overflowY: 'auto', width: '99%', margin: '.5vmin 0' }} >
        <DescriptionBox text={ds.careers[career].Description[0]} setShowInfo={setShowInfo} />
      </div>
    </div>
  </>
}

const SpecInfoBox = ({ ds, specialization, setShowInfo }) => {
  return <>
    <div className='flex-center data-panel red-flat scanlines-back m2 p2'
      style={{ gridArea: '17 / 8 / span 21 / span 13', justifyContent: 'center', animationDelay: panelFade() }}>
      <div className='flex-center' style={{ display: 'block', overflowY: 'auto', width: '99%', margin: '.5vmin 0' }} >
        <DescriptionBox text={ds.specializations[specialization].Description[0]} setShowInfo={setShowInfo} />
      </div>
    </div>
  </>
}


const Specs = ({ ds, character, career, specialization, changeSpecialization }) => {
  const specList = ds.careers[career].Specializations[0].Key;
  const specCount = specList.length;
  return <>
    <div className='flex-center data-panel red-flat scanlines-back m2 p2' style={{ gridArea: '26 / 1 / span 12 / span 7', justifyContent: 'start' }} >
      <div className='flex-center' style={{ display: 'block', overflowY: 'auto', width: '99%', margin: '.5vmin 0' }} >
        {specList.map((key, i) =>
          <div key={uuid.v4()} className={`z-5 m2 p2 flex-center center data-panel font-small ${specialization === key ? 'orange-glow' : 'gray-flat-hover'}`}
            style={{ animationDelay: childFade(), marginTop: i === 0 ? 0 : '.5vmin', marginBottom: i === specCount - 1 ? 0 : '.5vmin' }}
            onClick={() => changeSpecialization(key)} >
            <div>{ds.specializations[key].Name[0]}</div>
          </div>
        )}
      </div>
    </div>
  </>
}

const SpecSkills = ({ ds, character, specialization, setSpecSkill }) => {
  return <>
    <div className='flex-row-center data-panel red-flat scanlines-back m2 p2 font-small'
      style={{ gridArea: '17 / 8 / span 2 / span 13', justifyContent: 'center', animationDelay: panelFade(), flexFlow: 'row wrap' }}>
      Pick Free Ranks {character.freeSpecRanks - character.skillsSpecFree.length} / {character.freeSpecRanks}
    </div>
    <div className='flex-row-center data-panel red-flat scanlines-back m2 p2'
      style={{ gridArea: '19 / 8 / span 19 / span 13', justifyContent: 'center', animationDelay: panelFade(), flexFlow: 'row wrap', alignItems: 'stretch' }}>
      {ds.specializations[specialization].CareerSkills[0].Key.map(key => {
        return <div key={uuid.v4()} className={`z-5 m2 p2 flex-center center data-panel font-small ${character.skillsSpecFree.includes(key) ? 'orange-glow' : 'gray-flat-hover'}`}
          style={{ animationDelay: childFade(), width: '45%' }}
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