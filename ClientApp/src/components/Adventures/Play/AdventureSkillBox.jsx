import React from 'react';
import { getSkills, getStatValue, getSkillValue, getCareerSkill, getSkillBuyCost, getSkillSellCost } from '../../../models/CharacterStats';
import uuid from 'uuid';
import GetSkillSymbols from '../../Universal/Symbol';
import DescriptionBox from '../../Universal/DescriptionBox';
import { ScrollPanel } from '../../Panels/Panels';

// const panelFade = new FadeInBuilder(0, 0.1, 2);
// const childFade = new FadeInBuilder(0.1, 0.2, 4);

export const AdventureSkillBox = ({ character, selectStat, selectSkill, setSelectSkill, ds, setShowInfo }) => {

  const updateSelectSkill = skill => {
    if (skill === selectSkill) {
      setSelectSkill('')
    } else {
      setSelectSkill(skill)
    }
  }
  const grid = (selectStat === '' && selectSkill === '') ? [14, 8, 24, 15] : [19, 8, 19, 15]
  const skillCount = Object.keys(ds.skills).length;

  return <ScrollPanel reset className='red-flat' area={grid}>
    {selectSkill === '' ? getSkills(ds, selectStat).map(([key, value], i) => {
      return <div key={uuid.v4()} className='z-5 m2 p2 flex-left data-panel gray-flat-hover'
        style={{ marginTop: i === 0 ? 0 : '.5vh', marginBottom: i === skillCount - 1 ? 0 : '.5vh' }}
        onClick={() => updateSelectSkill(key)} >
        <div className='font-small'>{value} ({getSkillValue(character, key)}){getCareerSkill(character, key) ? ' - C' : ''}</div> <GetSkillSymbols skill={key} {...{ character, ds }} />
      </div>
    })
      :
      <>
        <div className='z-5 m2 p2 flex-left data-panel orange-glow scanlines-back'
          style={{ marginTop: 0 }}
          onClick={() => setSelectSkill('')} >
          {/* {selectSkill}: {character.skills[selectSkill]} */}
          <div className='font-small'>{ds.skills[selectSkill].Name[0]} ({getSkillValue(character, selectSkill)}){getCareerSkill(character, selectSkill) ? ' - C' : ''}</div> <GetSkillSymbols skill={selectSkill} {...{ character, ds }} />
        </div>
        <DescriptionBox text={ds.skills[selectSkill].Description[0]} {...{ setShowInfo }} />
      </>
    }
  </ScrollPanel>
}

export const CharacteristicsBuySell = ({ setCharacter, character, selectStat, ds }) => {
  const buyCost = (getStatValue(character, selectStat) + 1) * 10;
  const sellCost = (getStatValue(character, selectStat)) * 10;
  const canBuy = character.unusedXp >= buyCost;

  const buyStat = () => {
    let stat = getStatValue(character, selectStat);
    if (character.unusedXp >= buyCost && stat < 5) {
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


  return <div className='flex-center data-panel red-flat scanlines-back m2 font-small'
    style={{ marginLeft: '.5vh', marginRight: '.5vh', justifyContent: 'space-evenly', gridArea: '14 / 8 / span 5 / span 15' }} >
    Characteristic ({ds.characteristics[selectStat].Name[0]})
    <div className='flex-row-center full-width'>
      <div className={`z-5 m2 p2 flex-left data-panel scanlines-back full-width ${character.characteristicsBuy[selectStat] > 0 ? 'blue-glow' : 'gray-flat'}`}
        onClick={() => sellStat()}
      >+{sellCost}</div>
      <div className={`z-5 m2 p2 flex-left data-panel scanlines-back full-width ${canBuy ? 'blue-glow' : 'gray-flat'}`}
        onClick={() => buyStat()}
      >-{buyCost}</div>
    </div>

  </div>
}

export const SkillBuySell = ({ setCharacter, character, selectSkill, ds }) => {
  const buyCost = getSkillBuyCost(character, selectSkill);
  const sellCost = getSkillSellCost(character, selectSkill);
  const canBuy = character.unusedXp >= buyCost;
  selectSkill = selectSkill.replace(' ', '_');


  const buySkill = () => {
    let stat = getSkillValue(character, selectSkill);
    if (character.unusedXp >= buyCost && stat < 5) {
      setCharacter({
        ...character, skillsBuy:
        {
          ...character.skillsBuy,
          [selectSkill]: character.skillsBuy[selectSkill] + 1
        }, unusedXp: character.unusedXp - buyCost
      })
    }
  }

  const sellSkill = () => {
    if (character.skillsBuy[selectSkill] > 0) {
      setCharacter({
        ...character, skillsBuy:
        {
          ...character.skillsBuy,
          [selectSkill]: character.skillsBuy[selectSkill] - 1
        }, unusedXp: character.unusedXp + sellCost
      })
    }
  }


  return <div className='flex-center data-panel red-flat scanlines-back m2 font-small'
    style={{ marginLeft: '.5vh', marginRight: '.5vh', justifyContent: 'space-evenly', gridArea: '14 / 8 / span 5 / span 15' }} >
    Skill ({ds.skills[selectSkill].Name[0]})
    <div className='flex-row-center full-width'>
      <div className={`z-5 m2 p2 flex-left data-panel scanlines-back full-width ${character.skillsBuy[selectSkill] > 0 ? 'blue-glow' : 'gray-flat'}`}
        onClick={() => sellSkill()}
      >+{sellCost}</div>
      <div className={`z-5 m2 p2 flex-left data-panel scanlines-back full-width ${canBuy ? 'blue-glow' : 'gray-flat'}`}
        onClick={() => buySkill()}
      >-{buyCost}</div>
    </div>

  </div>
}
