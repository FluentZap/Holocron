// export default {
//   name: 'Scoundrel',
//   xp: 110,
//   unusedXp: 110,
//   credits: 500,
//   species: 'Droid',
//   speciesName: 'Droid',
//   career: '',
//   specializations: 'Charmer,Pilot',
//   wound: 0,
//   woundThreshold: 10,
//   strain: 0,
//   strainThreshold: 10,
//   soak: 2,
//   skills: {
//     Astrogation: 0,
//     Athletics: 0,
//     Brawl: 0,
//     Charm: 0,
//     Coercion: 0,
//     Computers: 0,
//     Cool: 0,
//     Coordination: 0,
//     Core_Worlds: 0,
//     Deception: 0,
//     Discipline: 0,
//     Education: 0,
//     Gunnery: 0,
//     Leadership: 0,
//     Lightsaber: 0,
//     Lore: 0,
//     Mechanics: 0,
//     Medicine: 0,
//     Melee: 0,
//     Negotiation: 0,
//     Outer_Rim: 0,
//     Perception: 0,
//     Piloting_Planetary: 0,
//     Piloting_Space: 0,
//     Ranged_Heavy: 0,
//     Ranged_Light: 0,
//     Resilience: 0,
//     Skulduggery: 0,
//     Stealth: 0,
//     Streatwise: 0,
//     Survival: 0,
//     Underworld: 0,
//     Vigilance: 0,
//     Xenology: 0,
//     Warfare: 0,
//     Cybernetics: 0,
//   },
//   characteristics: {
//     brawn: 2,
//     agility: 2,
//     intellect: 2,
//     cunning: 2,
//     willpower: 2,
//     presence: 2,
//   }
// }

export function newCharacter(species, name) {
  const { Name, StartingChars, StartingAttrs, Description, Key } = species;
  const { Agility, Brawn, Cunning, Intellect, Presence, Willpower } = StartingChars[0];
  const { Experience, StrainThreshold, WoundThreshold } = StartingAttrs[0];

  return {
    name: name ? name : 'Scoundrel',
    credits: 500,
    career: 'SMUG',
    freeCareerRanks: 4,
    freeSpecRanks: 2,
    specializations: ['SCOUND'],
    wound: 0,
    strain: 0,
    soak: parseInt(Brawn[0]),
    skillsCareer: [],
    skillsCareerFree: [],
    skillsSpec: ['CHARM', 'COOL', 'DECEP', 'RAMGLT'],
    skillsSpecFree: [],
    skillsBuy: {
      ASTRO: 0,
      ATHL: 0,
      BRAWL: 0,
      CHARM: 0,
      COERC: 0,
      COMP: 0,
      COOL: 0,
      COORD: 0,
      CORE: 0,
      CYBERNETICS: 0,
      DECEP: 0,
      DISC: 0,
      EDU: 0,
      GUNN: 0,
      LEAD: 0,
      LORE: 0,
      LTSABER: 0,
      MECH: 0,
      MED: 0,
      MELEE: 0,
      NEG: 0,
      OUT: 0,
      PERC: 0,
      PILOTPL: 0,
      PILOTSP: 0,
      RANGHVY: 0,
      RANGLT: 0,
      RESIL: 0,
      SKUL: 0,
      STEAL: 0,
      SURV: 0,
      SW: 0,
      UND: 0,
      VIGIL: 0,
      WARF: 0,
      XEN: 0,
    },
    species: Key[0],
    speciesName: Name[0],
    xp: parseInt(Experience[0]),
    unusedXp: parseInt(Experience[0]),
    characteristics:
    {
      BR: parseInt(Brawn[0]),
      AG: parseInt(Agility[0]),
      INT: parseInt(Intellect[0]),
      CUN: parseInt(Cunning[0]),
      WIL: parseInt(Willpower[0]),
      PR: parseInt(Presence[0])
    },
    characteristicsBuy:
    {
      BR: 0,
      AG: 0,
      INT: 0,
      CUN: 0,
      WIL: 0,
      PR: 0,
    },
    strainThreshold: parseInt(StrainThreshold[0]),
    woundThreshold: parseInt(WoundThreshold[0])
  }
}
export function getSkills(ds, char) {
  let skills = [];
  Object.entries(ds.skills).forEach(([key, value]) => {
    if (char === '' || value.CharKey[0] === char) {
      skills.push([value.Key[0], value.Name[0]]);
    }
  });
  skills.sort();
  return skills;
}

export function getStatValue(character, stat) {
  return character.characteristics[stat] + character.characteristicsBuy[stat];
}

export function getSkillValue(character, skill) {
  return character.skillsBuy[skill]
    + (character.skillsCareerFree.includes(skill) ? 1 : 0)
    + (character.skillsSpecFree.includes(skill) ? 1 : 0);
}

export function getCareerSkill(character, skill) {
  return character.skillsCareer.includes(skill) || character.skillsSpec.includes(skill);
}

export function setCharacterCareer(ds, character, career) {
  let oldChar = { ...character };
  let newChar = newCharacter(ds.species[character.species]);
  newChar.name = oldChar.name;
  newChar.career = career;
  newChar.specializations = [ds.careers[career].Specializations[0].Key[0]];
  newChar.freeCareerRanks = parseInt(ds.careers[career].FreeRanks[0]);
  newChar.skillsSpecFree = [];
  newChar.skillsSpec = [...ds.specializations[newChar.specializations].CareerSkills[0].Key];
  return newChar;
}


export function recalculateXp(ds, character) {
  let startXp = parseInt(ds.species[character.species].StartingAttrs[0].Experience[0]);
  let freeSkills = {};
  let newSkillsBuy = {};

  character.skillsCareerFree.forEach(skill => {
    if (freeSkills[skill]) {
      freeSkills[skill] += 1;
    } else {
      freeSkills[skill] = 1;
    }
  });

  character.skillsSpecFree.forEach(skill => {
    if (freeSkills[skill]) {
      freeSkills[skill] += 1;
    } else {
      freeSkills[skill] = 1;
    }
  });
  console.log(freeSkills);
  
  let skills = Object.keys(character.skillsBuy);
  for (let i = 0; i < skills.length; i++) {
    let skill = skills[i];
    newSkillsBuy[skill] = 0;

    let freeRanks = freeSkills[skill] ? freeSkills[skill] : 0

    for (let rank = 0; rank < character.skillsBuy[skill]; rank++) {
      let cost = getCareerSkill(character, skill) ?
        (freeRanks + newSkillsBuy[skill] + 1) * 5 :
        (freeRanks + newSkillsBuy[skill] + 1) * 5 + 5;      
      if (cost <= startXp && newSkillsBuy[skill] + freeRanks < 5) {
        newSkillsBuy[skill]++;
        startXp -= cost;
      }
    }
  }
  // console.log(freeSkills);
  // console.log(newSkillsBuy, startXp);
  return [startXp, newSkillsBuy]
}


export function getSkillBuyCost(character, skill) {  
  return getCareerSkill(character, skill) ?
    (getSkillValue(character, skill) + 1) * 5 :
    (getSkillValue(character, skill) + 1) * 5 + 5;
}

export function getSkillSellCost(character, skill) {
  return getCareerSkill(character, skill) ?
    getSkillValue(character, skill) * 5 :
    getSkillValue(character, skill) * 5 + 5;
}

// export function getSkillName(skillList, skill) {
//   return character.skills[skill] + character.skillsBuy[skill];
// }

// getSkills(): Array<Skill>;
// getSkills(characteristics ?: string): Array < Skill > {
//   if(characteristics) {
//     return this.skills.filter(skill => {
//       if (skill.characteristic === characteristics) {
//         return skill;
//       }
//     });
//   } else {
//     return this.skills;
//   }
// }

      // const { Name, StartingChars, StartingAttrs, Description, Key } = species;
      // const { Agility, Brawn, Cunning, Intellect, Presence, Willpower } = StartingChars[0];
      // const { Experience, StrainThreshold, WoundThreshold } = StartingAttrs[0];

      // this.species = Key[0];
      // this.speciesName = Name[0];
      // this.xp = this.unusedXp = parseInt(Experience[0]);
      // this.characteristics = new Characteristics(parseInt(Brawn[0]), parseInt(Agility[0]), parseInt(Intellect[0]), parseInt(Cunning[0]), parseInt(Willpower[0]), parseInt(Presence[0]));
      // this.strainThreshold = parseInt(StrainThreshold[0]);
      // this.woundThreshold = parseInt(WoundThreshold[0]);

    // species
    // this.skills = [
    //   new Skill('astrogation', 'Astrogation', 'intellect'),
    //   new Skill('athletics', 'Athletics', 'brawn'),
    //   new Skill('brawl', 'Brawl', 'brawn'),
    //   new Skill('charm', 'Charm', 'presence'),
    //   new Skill('coercion', 'Coercion', 'willpower'),
    //   new Skill('computers', 'Computers', 'intellect'),
    //   new Skill('cool', 'Cool', 'presence'),
    //   new Skill('coordination', 'Coordination', 'agility'),
    //   new Skill('coreWorlds', 'Core Worlds', 'intellect'),
    //   new Skill('deception', 'Deception', 'cunning'),
    //   new Skill('discipline', 'Discipline', 'willpower'),
    //   new Skill('education', 'Education', 'intellect'),
    //   new Skill('gunnery', 'Gunnery', 'agility'),
    //   new Skill('leadership', 'Leadership', 'presence'),
    //   new Skill('lightsaber', 'Lightsaber', 'brawn'),
    //   new Skill('lore', 'Lore', 'intellect'),
    //   new Skill('mechanics', 'Mechanics', 'intellect'),
    //   new Skill('medicine', 'Medicine', 'intellect'),
    //   new Skill('melee', 'Melee', 'brawn'),
    //   new Skill('negotiation', 'Negotiation', 'presence'),
    //   new Skill('outerRim', 'Outer Rim', 'intellect'),
    //   new Skill('perception', 'Perception', 'cunning'),
    //   new Skill('pilotingPlanetary', 'Piloting Planetary', 'agility'),
    //   new Skill('pilotingSpace', 'Piloting Space', 'agility'),
    //   new Skill('rangedHeavy', 'Ranged Heavy', 'agility'),
    //   new Skill('rangedLight', 'Ranged Light', 'agility'),
    //   new Skill('resilience', 'Resilience', 'brawn'),
    //   new Skill('skulduggery', 'Skulduggery', 'cunning'),
    //   new Skill('stealth', 'Stealth', 'agility'),
    //   new Skill('streatwise', 'Streatwise', 'cunning'),
    //   new Skill('survival', 'Survival', 'cunning'),
    //   new Skill('underworld', 'Underworld', 'intellect'),
    //   new Skill('vigilance', 'Vigilance', 'willpower'),
    //   new Skill('xenology', 'Xenology', 'intellect'),
    //   new Skill('warfare', 'Warfare', 'intellect'),
    //   new Skill('cybernetics', 'Cybernetics', 'intellect')
    // ]

// class Skill {
//   value: number = 0;
//   constructor(
//     public name: string,
//     public displayName: string,
//     public characteristic: string,
//   ) { }
// }
