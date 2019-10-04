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

export function newCharacter(species) {
  const { Name, StartingChars, StartingAttrs, Description, Key } = species;
  const { Agility, Brawn, Cunning, Intellect, Presence, Willpower } = StartingChars[0];
  const { Experience, StrainThreshold, WoundThreshold } = StartingAttrs[0];

  return {
    name: 'Scoundrel',
    credits: 500,
    career: '',
    specializations: 'Charmer,Pilot',
    wound: 0,
    strain: 0,
    soak: parseInt(Brawn[0]),
    skills: {
      Astrogation: 0,
      Athletics: 0,
      Brawl: 0,
      Charm: 0,
      Coercion: 0,
      Computers: 0,
      Cool: 0,
      Coordination: 0,
      Core_Worlds: 0,
      Deception: 0,
      Discipline: 0,
      Education: 0,
      Gunnery: 0,
      Leadership: 0,
      Lightsaber: 0,
      Lore: 0,
      Mechanics: 0,
      Medicine: 0,
      Melee: 0,
      Negotiation: 0,
      Outer_Rim: 0,
      Perception: 0,
      Piloting_Planetary: 0,
      Piloting_Space: 0,
      Ranged_Heavy: 0,
      Ranged_Light: 0,
      Resilience: 0,
      Skulduggery: 0,
      Stealth: 0,
      Streatwise: 0,
      Survival: 0,
      Underworld: 0,
      Vigilance: 0,
      Xenology: 0,
      Warfare: 0,
      Cybernetics: 0,
    },
    species: Key[0],
    speciesName: Name[0],
    xp: parseInt(Experience[0]),
    unusedXp: parseInt(Experience[0]),
    characteristics:
    {
      brawn: parseInt(Brawn[0]),
      agility: parseInt(Agility[0]),
      intellect: parseInt(Intellect[0]),
      cunning: parseInt(Cunning[0]),
      willpower: parseInt(Willpower[0]),
      presence: parseInt(Presence[0])
    },
    characteristicsBuy:
    {
      brawn: 0,
      agility: 0,
      intellect: 0,
      cunning: 0,
      willpower: 0,
      presence: 0,
    },
    strainThreshold: parseInt(StrainThreshold[0]),
    woundThreshold: parseInt(WoundThreshold[0])
  }
}

const skillLookup = {
  intellect: ['Astrogation',
    'Computers',
    'Core Worlds',
    'Education',
    'Lore',
    'Mechanics',
    'Medicine',
    'Outer Rim',
    'Underworld',
    'Xenology',
    'Warfare',
    'Cybernetics'],
  brawn: ['Athletics',
    'Brawl',
    'Lightsaber',
    'Melee',
    'Resilience'],
  presence: ['Charm',
    'Cool',
    'Leadership',
    'Negotiation'],
  agility: ['Coordination',
    'Gunnery',
    'Piloting Planetary',
    'Piloting Space',
    'Ranged Heavy',
    'Ranged Light',
    'Stealth'],
  cunning: ['Deception',
    'Perception',
    'Skulduggery',
    'Streatwise',
    'Survival'],
  willpower: ['Coercion',
    'Discipline',
    'Vigilance']
}

export function getSkills(char) {
  if (char === '') {
    let skills = [].concat(skillLookup.intellect, skillLookup.brawn, skillLookup.presence, skillLookup.agility, skillLookup.cunning, skillLookup.willpower);
    console.log(skills);    
    return skills;
  }
  return skillLookup[char];
}
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
