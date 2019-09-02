export default class CharacterStats {
  name: string = 'Scoundrel';
  xp: number = 110;
  unusedXp: number = 110;
  credits: number = 500;
  species: string = 'Droid';
  career: string = 'Smuggler';
  specializations: string = 'Charmer,Pilot';
  wound: number = 0;
  woundThreshold: number = 10;
  strain: number = 0;
  strainThreshold: number = 10;
  soak: number = 2;
  skills: Array<Skill>;
  characteristics: Characteristics = new Characteristics();


  constructor() {
    this.skills = [
      new Skill('astrogation', 'Astrogation', 'intellect'),
      new Skill('athletics', 'Athletics', 'brawn'),
      new Skill('brawl', 'Brawl', 'brawn'),
      new Skill('charm', 'Charm', 'presence'),
      new Skill('coercion', 'Coercion', 'willpower'),
      new Skill('computers', 'Computers', 'intellect'),
      new Skill('cool', 'Cool', 'presence'),
      new Skill('coordination', 'Coordination', 'agility'),
      new Skill('coreWorlds', 'Core Worlds', 'intellect'),
      new Skill('deception', 'Deception', 'cunning'),
      new Skill('discipline', 'Discipline', 'willpower'),
      new Skill('education', 'Education', 'intellect'),
      new Skill('gunnery', 'Gunnery', 'agility'),
      new Skill('leadership', 'Leadership', 'presence'),
      new Skill('lightsaber', 'Lightsaber', 'brawn'),
      new Skill('lore', 'Lore', 'intellect'),
      new Skill('mechanics', 'Mechanics', 'intellect'),
      new Skill('medicine', 'Medicine', 'intellect'),
      new Skill('melee', 'Melee', 'brawn'),
      new Skill('negotiation', 'Negotiation', 'presence'),
      new Skill('outerRim', 'Outer Rim', 'intellect'),
      new Skill('perception', 'Perception', 'cunning'),
      new Skill('pilotingPlanetary', 'Piloting Planetary', 'agility'),
      new Skill('pilotingSpace', 'Piloting Space', 'agility'),
      new Skill('rangedHeavy', 'Ranged Heavy', 'agility'),
      new Skill('rangedLight', 'Ranged Light', 'agility'),
      new Skill('resilience', 'Resilience', 'brawn'),
      new Skill('skulduggery', 'Skulduggery', 'cunning'),
      new Skill('stealth', 'Stealth', 'agility'),
      new Skill('streatwise', 'Streatwise', 'cunning'),
      new Skill('survival', 'Survival', 'cunning'),
      new Skill('underworld', 'Underworld', 'intellect'),
      new Skill('vigilance', 'Vigilance', 'willpower'),
      new Skill('xenology', 'Xenology', 'intellect'),
      new Skill('warfare', 'Warfare', 'intellect'),
      new Skill('cybernetics', 'Cybernetics', 'intellect')
    ]
  }

  getSkills(): Array<Skill>;
  getSkills(characteristics?: string): Array<Skill> {
    if (characteristics) {
      return this.skills.filter(skill => {
        if (skill.characteristic === characteristics) {
          return skill;
        }
      });
    } else {
      return this.skills;
    }
  }
}

class Characteristics {
  constructor(
    public brawn: number = 2,
    public agility: number = 2,
    public intellect: number = 2,
    public cunning: number = 2,
    public willpower: number = 2,
    public presence: number = 2,
  ) { }
}

class Skill {
  value: number = 0;
  constructor(
    public name: string,
    public displayName: string,
    public characteristic: string,
  ) { }
}