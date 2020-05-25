import { getStatValue, getSkillValue } from '../../models/CharacterStats';
import React from 'react';
import { v4 as uuid } from 'uuid';

const GetSkillSymbols = ({ skill, character, ds }) => {
  let symbolString = [];
  const stat = getStatValue(character, ds.skills[skill].CharKey);
  const skillRank = getSkillValue(character, skill);
  const max = Math.max(stat, skillRank)
  for (let i = 1; i <= max; i++) {
    if (stat >= i && skillRank >= i) {
      symbolString.push('skill');
    } else if (stat >= i || skillRank >= i) {
      symbolString.push('basic');
    }
  }
  return <div>
    {symbolString.map(char => {
      if (char === 'skill') {
        return <span key={uuid()} className='smbl font-small' style={{ color: 'yellow' }}>c</span>
      }
      return <span key={uuid()} className='smbl font-small' style={{ color: 'green' }}>d</span>
    })}
  </div>
}

const getSymbol = symbol => {
  switch (symbol) {
    case `[AB]`:
      return `<span key={uuid()} className='smbl font-small' style={{ color: 'yellow' }}>a</span>`
    case `[AD]`:
      return `<span key={uuid()} className='smbl font-small' style={{ color: 'yellow' }}>a</span>`
    case `[BO]`:
      return `<span key={uuid()} className='smbl font-small' style={{ color: 'yellow' }}>a</span>`
    case `[CH]`:
      return `<span key={uuid()} className='smbl font-small' style={{ color: 'yellow' }}>a</span>`
    case `[DA]`:
      return `<span key={uuid()} className='smbl font-small' style={{ color: 'yellow' }}>a</span>`
    case `[DE]`:
      return `<span key={uuid()} className='smbl font-small' style={{ color: 'yellow' }}>a</span>`
    case `[DI]`:
      return `<span key={uuid()} className='smbl font-small' style={{ color: 'yellow' }}>a</span>`
    case `[FP]`:
      return `<span key={uuid()} className='smbl font-small' style={{ color: 'yellow' }}>a</span>`
    case `[FO]`:
      return `<span key={uuid()} className='smbl font-small' style={{ color: 'yellow' }}>a</span>`
    case `[LI]`:
      return `<span key={uuid()} className='smbl font-small' style={{ color: 'yellow' }}>a</span>`
    case `[PR]`:
      return `<span key={uuid()} className='smbl font-small' style={{ color: 'yellow' }}>a</span>`
    case `[RS]`:
      return `<span key={uuid()} className='smbl font-small' style={{ color: 'yellow' }}>a</span>`
    case `[RE]`:
      return `<span key={uuid()} className='smbl font-small' style={{ color: 'yellow' }}>a</span>`
    case `[SE]`:
      return `<span key={uuid()} className='smbl font-small' style={{ color: 'yellow' }}>a</span>`
    case `[SU]`:
      return `<span key={uuid()} className='smbl font-small' style={{ color: 'yellow' }}>a</span>`
    case `[TH]`:
      return `<span key={uuid()} className='smbl font-small' style={{ color: 'yellow' }}>a</span>`
    case `[TR]`:
      return `<span key={uuid()} className='smbl font-small' style={{ color: 'yellow' }}>a</span>`
    case `[DD]`:
      return `<span key={uuid()} className='smbl font-small' style={{ color: 'yellow' }}>a</span>`
    case `[UD]`:
      return `<span key={uuid()} className='smbl font-small' style={{ color: 'yellow' }}>a</span>`
    case `[CT]`:
      return `<span key={uuid()} className='smbl font-small' style={{ color: 'yellow' }}>a</span>`
    default:
      return ''
  }     
}

// export getSymbol;

export default GetSkillSymbols;