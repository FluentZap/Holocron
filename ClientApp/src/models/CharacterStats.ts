export default class CharacterStats {
  name: string = 'Scoundrel';
  xp: number = 110;
  unusedXp: number = 110;
  credits: number = 500;
  species: string = 'Droid';
  speciesName: string = 'Droid';
  career: string = '';
  specializations: string = 'Charmer,Pilot';
  wound: number = 0;
  woundThreshold: number = 10;
  strain: number = 0;
  strainThreshold: number = 10;
  soak: number = 2;
  skills: Array<Skill>;
  characteristics: Characteristics = new Characteristics();

  constructor()
  constructor(species?: string) {
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


    if (species) {
      // this.species = SpeciesDescription[species].name;      
      this.speciesName = SpeciesDescription['human'].name;
    } else {

    }
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

class Species {
  name: string = '';
  wound: number = 0;
  strain: number = 0;
  xp: number = 0;
  skills: string = '';
  characteristics: Characteristics = new Characteristics();

  constructor(props: object) {
    Object.assign(this, props);
  }
}



export const SpeciesDescription = {
  human: new Species({
    name: 'Human',
    wound: 10,
    strain: 10,
    xp: 110,
    skills: 'any',
    characteristics: new Characteristics(2, 2, 2, 2, 2, 2)
  }),
  chiss: new Species({
    name: 'Chiss',
    wound: 10,
    strain: 10,
    xp: 100,
    skills: 'cool',
    characteristics: new Characteristics(2, 2, 3, 2, 2, 1),
    description: [
      "With a profound respect for art and creative achievements, the Chiss explore the mysteries of the galaxy while maintaining their own mysteries about their origins. They excel at problem solving and strategic thinking, and their compatibility with both humans and non-humans make them excellent bridges between disparate cultures.",
      [
        "Physiology",
        "Near-humans with dark-blue skin and glowing red eyes, the Chiss tend to run to the tall side of the human body type. Their skin color and eyes grow more intense the greater concentration of oxygen they are in. On average, Chiss tend to be more physically fit and overall more attractive than regular humans, assuming one is not thrown off by the skin and eyes. Their hair is universally jet black, save for the silvering found in those of advanced age.",
        "Genetic analysis reveals that the Chiss are an offshoot of humanity, most likely dating back to the earliest eras of expansionism.Millennia of subterranean living altered their biology considerably.Not only did it result in the shift of their appearance from standard human but also their greater strength, endurance, and other physical qualities over baseline humans.They also reach physical maturity much more rapidly; most are physically and emotionally mature by their early teens, and on average, Chiss live about 80 standard years.",
      ],
      "Society",
      [
        "Cautious, thoughtful, and highly cultured, the Chiss have generally kept to themselves as a civilization for much of their long history. Rare individuals venture forth from the Chiss Ascendancy, as most prefer to keep to the security of a society they revere as superior. Art, culture, intellectual advancement, and discipline are highly prized qualities among the Chiss, and they have worked hard to build a society that relies not upon economic achievement but upon personal growth and contributions to the society as a whole.",
        "Those Chiss that do venture into the galaxy at large do so generally with a profound respect for their peoples' desire to remain apart from the Empire and its struggles. Few beings outside of the Chiss even know where the Ascendancy is, which is the preferred state of affairs for them. Individual Chiss see the chance for great personal growth among the stars, as well as a chance to learn many things they can take back to their people.",
      ],
      "Homeworld",
      [
        "Though most Chiss believe their world was a kind of tropical paradise when their ancestors first landed on it, the planet of Csilla entered a full - bore ice age nearly 5, 000 years ago.Glaciers ultimately claimed the surface of the world, driving the technologically advanced people below ground.There, in thousands of warrens built to manage resources and energy effectively, with extensive networks of passages to keep the civilization connected and unified, the Chiss have thrived as a species."
      ],
      "Language",
      [
        "Though any Explorer Chiss will know Basic, he's also fluent in a language only a member of his species can speak properly—Cheunh. Though Chiss are biologically connected to and similar to humans in most ways, they possess certain variances in their vocal apparatus that permit sounds and textures to their speech that make for a language many other species find strangely beautiful to hear. The structure of the language, steeped in context-derived combinations of words for idea expression, as well as the unique nature of Chiss vocal abilities, necessitated their adoption of trade languages. Sy Bisti and Minnisiat served the species well after they first reached outward from their homeworld, Csilla."
      ]
    ]
  })
}