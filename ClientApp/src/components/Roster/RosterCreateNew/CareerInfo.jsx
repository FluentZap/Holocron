import React, { useState } from 'react';
import uuid from 'uuid';
import FadeInBuilder from '../../FadeInBuilder';
import { getSkillValue } from '../../../models/CharacterStats';
import GetSkillSymbols from '../../Universal/Symbol';
import DescriptionBox from '../../Universal/DescriptionBox';

const panelFade = new FadeInBuilder(0, 0.1, 2);
const childFade = new FadeInBuilder(0.1, 0.2, 4);

const CareerInfo = ({ ds, career, changeCareer, character, setCharacter, setShowInfo }) => {
  const careerCount = Object.keys(ds.careers).length;
  console.log(ds.careers[career].CareerSkills[0].Key);

  const [careerCategory, setCareerCategory] = useState('Info')

  const setSkill = skill => {
    if (character.skillsCareer[skill] === 1 && character.skillsFree[skill] > 0) {
      setCharacter({
        ...character,
        skillsCareer: { ...character.skillsCareer, [skill]: 0 },
        freeRanks: character.freeRanks + 1,
        skillsFree: { ...character.skillsFree, [skill]: character.skillsFree[skill] - 1 }
      })
    } else if (character.freeRanks > 0) {
      setCharacter({
        ...character,
        skillsCareer: { ...character.skillsCareer, [skill]: 1 },
        freeRanks: character.freeRanks - 1,
        skillsFree: { ...character.skillsFree, [skill]: character.skillsFree[skill] + 1 }
      })
    }
  }


  return <>
    <div className='flex-center data-panel red-flat scanlines-back m2 p2'
      style={{ gridArea: '14 / 1 / span 24 / span 7', justifyContent: 'start', animationDelay: panelFade() }}>
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
    {careerCategory === 'Skills' ?
      <CareerSkills {...{ ds, character, career, setSkill }} />
      : careerCategory === 'Info' ?
        <CareerInfoBox {...{ ds, character, career, setSkill, setShowInfo }} /> : ''
    }


    <button className={'flex-center data-panel scanlines-back m2 font-small ' + (careerCategory === 'Info' ? 'orange-glow' : 'red-glow')}
      onClick={() => setCareerCategory('Info')}
      style={{ gridArea: '14 / 8 / span 2 / span 3', animationDelay: panelFade() }}>Info</button>

    <button className={'flex-center data-panel scanlines-back m2 font-small ' + (careerCategory === 'Skills' ? 'orange-glow' : 'red-glow')}
      onClick={() => setCareerCategory('Skills')}
      style={{ gridArea: '14 / 11 / span 2 / span 3', animationDelay: panelFade() }}>Skills</button>
  </>
}




const CareerSkills = ({ ds, character, career, setSkill }) => {
  return <>
    <div className='flex-row-center data-panel red-flat scanlines-back m2 p2 font-small'
      style={{ gridArea: '17 / 8 / span 2 / span 13', justifyContent: 'center', animationDelay: panelFade(), flexFlow: 'row wrap' }}>
      Pick Career Skills {character.freeRanks} / {character.freeRanks}
    </div>
    <div className='flex-row-center data-panel red-flat scanlines-back m2 p2'
      style={{ gridArea: '19 / 8 / span 19 / span 13', justifyContent: 'center', animationDelay: panelFade(), flexFlow: 'row wrap', alignItems: 'stretch' }}>
      {ds.careers[career].CareerSkills[0].Key.map(key => {
        return <div key={uuid.v4()} className={`z-5 m2 p2 flex-center center data-panel font-small ${character.skillsCareer[key] === 1 ? 'orange-glow' : 'gray-flat-hover'}`}
          style={{ animationDelay: childFade(), width: '45%' }}
          onClick={() => {
            setSkill(key);
          }}>
          {ds.skills[key].Name[0]} ({getSkillValue(character, key)}) <GetSkillSymbols skill={key} {...{ character, ds }} />
        </div>
      })}
    </div>
  </>
}

const CareerInfoBox = ({ ds, character, career, setSkill, setShowInfo }) => {
  return <>
    <div className='flex-center data-panel red-flat scanlines-back m2 p2'
      style={{ gridArea: '16 / 8 / span 22 / span 13', justifyContent: 'center', animationDelay: panelFade() }}>
      <div className='flex-center' style={{ display: 'block', overflowY: 'auto', width: '99%', margin: '.5vmin 0' }} >

        <DescriptionBox text={ds.careers[career].Description[0]} setShowInfo={setShowInfo} />

        {/* <div dangerouslySetInnerHTML={{ __html: ds.careers[career].Description[0] }} /> */}
      </div>      
    </div>
  </>
}





export default CareerInfo;