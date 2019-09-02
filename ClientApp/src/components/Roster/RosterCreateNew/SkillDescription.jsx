import React, { useMemo } from 'react';
import uuid from 'uuid';

const Description = ({ skill }) => (
  <div className='animate-fade-in z-5 m2 p2 flex-left data-panel gray-flat font-small'
    style={{ animationDelay: 0.1, marginLeft: '.5vmin', marginRight: '.5vmin' }}>
    <p className='m2'>{DescriptionText[skill].main}</p>
    <ul className='m2' style={{ paddingInlineStart: '3vh' }}>
      {DescriptionText[skill].list.map((text) => (
        <li className='m2' key={uuid.v4()}>{text}</li>
      ))}
    </ul>
  </div>
)

export default Description;


const DescriptionText = {
  cybernetics: {
    main:
      "At the GM's and players' discretion, Cybernetics can be presented as a custom skill rather than as a specific use of Mechanics and Medicine.The introduction of this skill is optional.",
    list: [
      "If introduced, Cybernetics is used for building, modifying, and installing cybernetic enhancements and replacements(see page 85 of the Special Modifications Technician Source Book), as well as other checks at the GM's discretion. Talents that apply to Mechanics or Medicine checks might apply to Cybernetics checks at the GM's discretion.The Cyber Tech should recieve Cybernetics as an additional bonus career skill."
    ]
  },
  astrogation: {
    main:
      "There are many billions of stars within the galaxy, all of which are in motion relative to one another.Planets and other smaller masses constantly orbit many of these stars.There are also huge numbers of nebulae and other astronomical anomalies.Traveling between the worlds of the galaxy requires a rudimentary knowledge of the galaxy's organization and composition. It also requires a navicomputer that is well-informed as to the current time and the relative motion of all of these objects. The Astrogation skill represents a character's ability to use his knowledge of the galaxy to most effectively program the hyper- space coordinates for any jump.",
    list: [
      "Any time that a character wishes to program a navicomputer for a hyperspace jump, he must first use Astrogation to program the navicomputer.",
      "Astrogation governs a character's basic knowledge of galactic geography. It may be checked any time a character wonders what other systems are nearby.",
      "In the event characters arrive in an unknown system, they may use a navicomputer and their Astrogation skill to identify their location.",
      "Astrogation also covers familiarity with the galaxy's hyperspace routes and the types of craft and commerce most common along those routes.",
    ]
  },
  athletics: {
    main:
      "Player Characters lead dramatic lives, filled with constant physical confrontations.Often that confrontation comes from an enemy with a blaster, but sometimes it may be a mountain to be scaled, a river to be swum, or a chasm that must be leapt.The Athletics skill governs these actions.It serves as a measure of the character's overall fitness and physical conditioning. Those who actively engage in a regimen of physical training such as survivalists or professional athletes are most likely to have a high rank of Athletics.",
    list: [
      "Any aspects of climbing—including rappelling or swinging on a line—fall under the purview of the Athletics skill.The difficulty of these tasks is calculated by the surface and weather conditions during the attempts.",
      "Characters who attempt to swim in difficult conditions must check their Athletics.Water conditions—particularly waves, current, and tides—dictate the overall challenge of any efforts to swim.",
      "A character's vertical and horizontal jump are both determined through use of an Athletics check. Gravitational conditions and the distance required factor into the difficulty.",
      "Any character can run, but sprinting or running for an extended time may fall under the purview of an Athletics check.",
    ]
  },
  brawl: {
    main:
      "During some physical confrontations, a character seeks to incapacitate his foe without seriously injuring him.At other times, a melee erupts with little preparation, and a character may not have any weapon at hand.Some individuals are thoroughly trained in unarmed combat, or have natural weapons that they prefer to use during physical altercations.In any of these situations, Brawl is the skill used to determine success or failure in the combat.",
    list: [
      "Most characters who grew up in a hostile environment have some knack for Brawl.All wildlife—particularly those with natural weapons—use Brawl when forced into a confrontation.Anyone who participates in military or law enforcement training learns some basic martial arts, which fall under the Brawl skill.Even more advanced or esoteric martial arts fall under the auspice of this skill.However, improvised weapons—such as a bottle or a table leg—are used with the Melee skill.",
      "In some conflicts, characters may be bound by the legal or social restrictions into fighting without weapons.Drawing a weapon could quickly escalate matters to a lethal fight and might have other repercussions, forcing the characters to depend upon their Brawl skill.",
    ]
  },
  charm: {
    main:
      "For a character with a kind smile and a silver tongue, it may be possible to travel the galaxy depending upon the kindness of others. An individual with this knack is capable of giving just the right compliment to his target—often by deciphering the subject's social and cultural background. Note that the use of the Charm skill requires the acting character to maintain a degree of sincerity in his statements. A character who is flagrantly flattering with no basis in reality may be better suited to using the Deception skill. See Social Skill Interactions on page 113 for for more information. Politicians. salesmen, and con artists are all renowned for their Charm.",
    list: [
      "Persuading an individual to make a special exception to his usual practices through flattery, flirting, and grace typically relies upon Charm.",
      "Appeals to a targets better nature—even if it does not exist—generally require a character to use Charm. These sorts of requests may often require the target to go out of his way to aid the characters, without any hope of remuneration.",
      "Seduction attempts for most species typically rely upon Charm, but for situations where the interest is entirely feigned it is often more appropriate to use Deception.",
      "Charm is often an opposed check, using the subject's Presence and Cool, except in situations where the PC is trying to Charm large groups, in which case it's often a set difficulty. Of course, situational modifiers may also apply based upon the character's style of dress, species, and other characteristics. For instances in which the desired outcome is directly opposed to the target's interests, an additional Difficulty die may be added.",
      "For situations in which the character is attempting to sway multiple subjects or a target who is already predisposed to react favorably toward the character, the character does not make an opposed check. Instead, the difficulty of the check is determined by the number of subjects and their disposition. Larger crowds or groups who are predisposed against the character's desired outcome require a more difficult check, while Charming those already favorable towards the character may require few, if any, Difficulty dice.",
    ]
  },
  coercion: {
    main:
      "Some people believe that the only way to be respected is to be feared. Others may only grant respect to those whom they fear. When a character attempts to instill obedience in a target through the use of threats or acts of physical intimidation, they utilize Coercion. See Social Skill Interactions on page 113 for more information. Sith, military dictators, and organized crime leaders are all known for their ability to coerce their subjects.",
    list: [
      "Any time a character issues a threat, whether or not it is accompanied by hostile actions, he is using Coercion against the subject. An implied threat—such as gesturing or pointing towards a weapon—is sufficient to invoke Coercion.",
      "If a target is questioned or persuaded under conditions of physical captivity, the acting character should make a Coercion check.",
      "Acts of physical torture always invoke Coercion. Of course, physical violence may also induce strain or wounds in a subject. Such actions are separate from the actual Coercion attempt.",
      "Coercion is an opposed check, resisted by the subject's Willpower and Discipline. Situational modifiers, such as the degree to which a subject is helpless or if the acting character's degree of threat is less significant than expected, may significantly affect the dice pool. Attempting to persuade a subject to betray his core beliefs should always add a Difficulty die to the pool.",
      "In situations in which the character is attempting to intimidate multiple subjects or a target who is already threatened by the character, the character need not make an opposed check. In such circumstances, the difficulty of the check is determined by the number of subjects and their disposition. Larger crowds or groups who are more likely to resist forced authority require a more difficult check, while Coercing those already cowed by the character may require few, if any, Difficulty dice.",
    ]
  },
  computers: {
    main:
      "The galaxy could scarcely function without the constant assistance of computers. Devices everywhere are linked together and coordinated by computers and droid brains. Those talented with computers can sometimes exploit these resources, or they might know how best to avoid those systems under computer control. Many people are so unconsciously dependent upon computers that those who can cleverly manipulate them may commit crimes without their victims even being aware of the offenses. Even using the HoloNet for communications or entertainment requires the use o computers—particularly if there are forces interfering with the system. This skill also governs the repair of a damaged computer system, defensive actions against an intruding slicer, and routine maintenance necessary to keep the software on a computer or droid running effectively.",
    list: [
      "Attempts to open a locked door, control an elevator, or bypass a security system make use of the Computers skill.",
      "Searching through a subject's records, particularly if those notes are encrypted, makes use of Computers to overcome any security measures and interpret the material's organizational structure and any external links.",
      "Investigating what actions a slicer might have taken against a computer system requires the Computers skill to identify the files that have been accessed or altered.",
      "Efforts to alter a droid's programming or gain access to its memories require the acting character to make a Computers check.",
      "Characters must make a Computers check to recover data from a system that has suffered physical damage.",
      "The difficulty for a Computers check is calculated based upon any defenses present within the system and the inherent sophistication of the system against intrusion. Slicing into a tapcafe's systems to alter a transaction might be trivially easy, while a military outpost could be hardened and prepared for a slicer's assault. In general, the more vital the materials protected by the system, the more difficult the system should be to overcome",
    ]
  },
  cool: {
    main:
      "Life on the fringe is filled with an endless variety of dangers.The ability to stay calm and think as one's life hangs in the balance can be essential for survival among the constant stream of new threats. By remaining emotionally centered, the character is much more likely to be able to effectively prioritize issues and solve the most critical problems first. These characters are also better able to remember and focus upon achieving their goals, allowing outside influences to have much less effect.",
    list: [
      "In some combat situations, a character's Initiative may be determined by his Cool skill. This is applicable under circumstances in which the acting character has calmly prepared to take action. See page 199 for the full details.",
      "A character's Cool may permit him to ignore many of the lies that come as part of a discussion. It is used to resist Charm and Negotiation. See Social Skill Interactions on page 113 for more information.",
      "Often, when someone is trying to be overly kind, the truth becomes lost among the niceties.Characters can use Cool to resist these efforts, penetrating through to the truth.",
      "If a character has set a trap for a target, carefully lining up a shot on an unsuspecting foe, he may check for Initiative using Cool, as he calmly selects the optimal time to begin the engagement.",
      "If multiple characters are engaging a third in a social discussion in which the timing of the argument matters, Cool may be used to determine Initiative, as that character is better prepared.",
    ]
  },
  coordination: {
    main:
      "When a character needs to go somewhere without being seen, it often requires him to balance upon unstable surfaces, crawl through narrow openings, or even to tumble down from a dangerous height.Overcoming these types of challenges requires a tremendous sense of balance and a heightened degree of flexibility.While both of those abilities depend heavily upon a person's natural characteristics, they can be further developed through regimens of practice and exercise.",
    list: [
      "Any time a character needs to contort his body into an unusual position, Coordination is used to calculate the dice pool.Note that some species may be inherently more flexible than the norm.This benefit is discussed in their species description where applicable.",
      "Many performers, mercenaries, and thieves become known for their natural flexibility and grace.For some, their lives may frequently depend upon their expertise in the skill.For others, the skill serves as an important complement to their other techniques.",
      "A character may attempt to reducing damage suffered when falling, diminishing the impact by rolling into a tumble on a successful Coordination action.See Falling on page 215 for more information.",
      "Walking across a narrow surface, whether a wide beam or a thin pipe, requires a tremendous sense of balance and a successful Coordination check.",
      "Characters can use Coordination to escape from restraints, contorting their limbs at unusual angles so that bindings slip free.",
      "Crawling through the twists and turns of a sewage pipe, ventilation duct, or garbage chute may require a successful Coordination check to avoid a sudden fall, or worse yet—becoming stuck in place.",
    ]
  },
  coreWorlds: {
    main:
      "Those worlds closest to the Galactic Core are generally considered to represent the pinnacle of galactic culture and civilization—especially by those who dwell within these systems.Cultural traditions vary substantially from system to system and even between planets within a given system.A few notions are particularly common among the worlds of the Core, but even with those, there are distinct exceptions.Perfectly acceptable behavior on one planet may represent grossly disruptive manners on another, even within this culturally distinct region of the galaxy.",
    list: [
      "Many hyperlanes connect the Core Worlds with the other portions of the galaxy.Because of this, visitors from foreign worlds are far more common here than in many other places.The Core Worlds represent centers of trade and diplomacy that can connect planets in disparate portions of the galaxy.",
      "If a character needs to identify a person's planet of origin without asking, he may make a Core Worlds check to recognize traits of his accent, dress, and mannerisms that are associated with a particular world.",
      "When interacting with someone from a Core World, a character might make a Core Worlds check to know what behaviors are considered necessary and polite, as opposed to ones that could be offensive.",
      "Characters who specialize in the transport and delivery of goods may make a Core Worlds check to identify which markets are the best places to sell or purchase a particular cargo.They may also recognize any worlds where such goods could be illegal.",
      "The difficulty of a Core Worlds check is generally proportionate to the rarity of the information involved.Common knowledge about Coruscant is far easier to recall than an obscure fact about a subsect on a minor moon.",
    ]
  },
  deception: {
    main:
      "Sometimes a character needs to persuade someone to act a certain way, but lacks any leverage for the discussion.In times like this, a certain degree of moral flexibility may be necessary.Whether it is an effort to persuade someone to make a purchase, do a favor, or simply be somewhere else, a well- timed and convincing lie can often be the difference between success and failure.When a falsehood plays the central part of a persuasive effort, that character is employing the Deception skill.Con artists, infiltrators, and many less reputable diplomats and merchants are all masters of Deception.Many individuals outside of these fields make use of this skill, but it is seldom a critical focus of their development.",
    list: [
      "Attempts to deceive are subject to the perceptions of the target.Deception is opposed by the subject's Discipline. See Social Skill Interactions on page 113 for more information. In situations in which the character is attempting to trick multiple subjects or a target who believes that character to be trustworthy, the character need not make an opposed check. In such circumstances, the difficulty of the check is determined by the number of subjects or their disposition (or both). Larger crowds or groups who are more likely to disbelieve the character require a more difficult check, while deceiving those already fooled by the character may require a lower difficulty.",
      "If a character wishes to mislead a buyer or seller about an object's value so that he may adjust the purchase price to his advantage, he uses Deception.",
      "Any time a character wishes to distract an opponent through guile—even within the context of a physical confrontation—he may make use of Deception.",
      "When pursued, a character, may choose to use Deception as a means to lay a false trail, in the hopes that the tracker might make a wrong turn, thus leaving the acting character ample time to escape.",
    ]
  },
  discipline: {
    main:
      "There are boundless horrors present across the span of.the galaxy.Some—like the rancor, the wampa, and the krayt dragon—are natural entities, which are horrifically violent as an outgrowth of their environs.Others, such as Sithspawn horrors or the Death Star, are deliberate creations made by sentient life, which serve little purpose save to spread terror and destruction.Through the course of their adventures, characters may often encounter creatures that seek to dismember or devour them.The ability to maintain their composure and react in an effective manner is governed by their Discipline.This skill represents a character's ability to overcome his biological instincts, so that he can overcome things that might induce utter panic in a person of lesser resolve.",
    list: [
      "A character's Discipline may enable him to overcome treachery and threats that others attempt to impose upon him. It is used to resist Leadership, Coercion, and Deception. See Social Skill Interactions on page 113 for more information.",
      "Discipline plays a key role in the development of Force abilities.See Chapter VIII: The Force for the full explanation.",
      "If a character is pinned down by heavy fire, he may need to pass a Discipline check in order to act normally.",
      "When confronted by a creature with inherently horrifying aspects, a character's ability to engage the foe rather than flee before its might is governed by the Discipline skill.",
      "Sometimes, a business contact might offer a character a deal that seems far too good to be true.The ability to resist such temptations is based upon Discipline.",
      "Mentally sorting truth from fiction and determining when someone is lying(and not letting oneself be swayed by those lies), is often a function of Discipline.",
    ]
  },
  education: {
    main:
      "Among most of the races and cultures of the galaxy, achieving literacy is a crucial first step towards adulthood.Even on the wildest cultural fringes of the Outer Rim, most individuals achieve at least this standard long before they reach physical maturity.Once literacy is attained, an individual's education generally expands to cover additional areas of expertise. ",
    list: [
      "Typically, this includes at least a basic grounding in the mathematics, the basic sciences, and enough understanding of engineering principles to perform basic repairs.Many also study the basics of philosophy, politics, and galactic history.From there, an understanding of the various dominant species and cultures across the galaxy provides a complement to a well- rounded education. ",
      "Characters must often rely upon these essentials in order to appropriately interact with the broader galaxy.To the uneducated, places beyond their home seldom make sense.Basic cultural variances may become overwhelming challenges.",
      "Any time a character needs to interact with a government entity, an Education check may be made to identify the best way to proceed.",
      "If a character needs to employ basic scientific knowledge in an analysis, his understanding of this field is represented by his Education skill.",
      "Education also represents a default Knowledge skill.Any time a question comes up that doesn't obviously fall under one of the other Knowledge skills, Education may be used to represent the character's understanding of a particular subject matter.",
      "The difficulty for an Education check is typically best represented by the rarity of the data in question.Characters who have a reference document at hand may receive substantial bonuses, but even using such a work requires an understanding of core principles.",
    ]
  },
  gunnery: {
    main:
      "Many weapons are simply too large for a person to carry.In order to bring such a weapon to bear against an opponent, it may be mounted aboard a vehicle, hastily assembled where needed, or even built into a substantial defensive emplacement.Weapons of this sort might require a team to transport, assemble, and ultimately operate. ",
    list: [
      "Characters seldom gain experience with weapons of this magnitude outside of military training.Weapons of this caliber are also difficult to acquire for anything but government entities.Only the most dangerous worlds have natural predators that require a weapon of this power as a proportionate response.Gunnery applies to laser cannons and proton torpedoes mounted on starships.Larger mounted weapon systems like heavy laser turrets and ion cannons are also fired using this skill.",
      "If a character is piloting a starfighter, it may have weapons that are mounted upon it with a fixed orientation.Prior to making a Gunnery check, the pilot may need to maneuver his craft in order to achieve a firing solution.",
      "Characters using Gunnery to fire turret - mounted weapons may need to hold their action until a pilot can drive the vehicle so that targets are within the weapon's firing arc. ",
      "Complex targeting computers and automated weapons mounts are often used with large scale weapons.Operating this equipment also falls under Gunnery.",
      "Gunnery check difficulties are determined by the distance to the target or relative silhouettes, depending on the weapon fired.The difficulty may be modified by maneuvers the character makes and specific combat situational modifiers as described in Chapter VI: Conflict and Combat.",
    ]
  },
  leadership: {
    main:
      "Even the greatest of heroes may sometimes need the assistance of others to complete their goals.Certainly the most foul of villains consistently use legions of flunkies to assist them in their criminal rampages.The ability to lead such companions and devotees can play a crucial part in the success or failure of any endeavor.While some may follow out of fear or the promise of tremendous riches, ultimately most individuals choose to work with a person in whom they have faith and trust.The Leadership skill represents a characters ability to instill that belief in the people with whom he chooses to interact.Politicians, military officers, and crime bosses all determine their degree of success based upon their abilities to lead others. ",
    list: [
      "Leadership is a combination of being able to make smart decisions, being firm and decisive when doing so, and instilling a sense of loyalty and respect in one's subordinates. See Social Skill Interactions on page 113 for more information. ",
      "If a character's allies have become subject to the effects of fear (see page 298), they may be rallied through a Leadership check. ",
      "When acting in a public venue, a character may use Leadership to sway a crowd to take action, most commonly of a political nature.",
      "If a character's underlings have fallen before the guile of an opponent, he may reassert their loyalty to his cause by making a successful Leadership check. ",
      "The difficulty of a Leadership check is based on the complexity of the orders a character is attempting to convey and the intelligence and professionalism of the subjects he is attempting to command.Particularly complex orders, or stubborn or particularly dull subjects, require a larger number of Difficulty dice, while a simple order given to a loyal servant may require few, if any, Difficulty dice.",
      "When a character attempts to command a target to perform an action that could result in his harm or is in some other way against his nature or best interest, an opposed check is required.The character's Leadership check is opposed by the Discipline or Willpower of the target, depending on the particulars of the order given.",
    ]
  },
  lightsaber: {
    main:
      'Lightsabers(and their derivatives) are quite unlike any other weapons in the galaxy.While most close combat weapons have some sort of blade or striking edge attached to a grip or handle, an inactive lightsaber seems to be nothing more than a simple weapon hilt.However, when activated, the hilt projects a humming "blade" of intense energy.Such weapons are difficult for even an accomplished swordfighter to use and require a very unique set of skills.',
    list: [
      "Although the Lightsaber skill is linked to the Brawn characteristic, many characters may have access to talents that can link the skill to a different characteristic instead, representing unique forms and fighting styles.The Lightsaber skill governs melee attacks made with lightsabers as well as with derivative weapons such as light whips, guard shotos, and training sabers. ",
      "The Lightsaber skill is most often used to make combat checks while using these weapons, though there may be other uses for this skill, at the GM's discretion. The difficulty of Lightsaber combat checks is Average (◆◆), the difficulty of all melee attacks. If the opponent is incapable of resisting, the check might be easier, at the GM's discretion.The difficulty may be modified by maneuvers the character makes and specific combat situational modifiers, as described in Chapter VI: Conflict and Combat.",
    ]
  },
  lore: {
    main:
      "Parts of the galaxy have been inhabited for more than a million years.During that time, countless civilizations have arisen and many have gone extinct.Those civilizations that achieved interstellar travel communicated with one another and shared their histories.Over the millennia, some of these tales changed and grew into myths and legends.Many have a strong basis in truth, so much so that some of these stories still conceal a potential for tremendous profit. ",
    list: [
      "Characters with a particular interest in lost cultures and ancient legends may decide to try to turn this interest into a profession.Forgotten fleets, abandoned mines, and failed ventures all could be the sources of tremendous profits if recovered and restored.Other times, a character might stumble across an artifact connected to one of these legends—an item whose value could far exceed its initial appearance.Knowing enough to exploit that connection—either in selling the item or in tracking down its origins—might enable a character to substantially decrease the severity of his Obligations.",
      "Any time a character needs to decipher an ancient piece of writing or identify its context, this requires a Lore check.",
      "A character's knowledge of the legends associated with the exploits of an ancient hero is represented by the Lore skill. ",
      "A Lore check's difficulty is assigned by the obscurity of the information. Well known legends may not even require a check, but the tales of a race that died out millennia ago may be nearly forgotten.",
    ]
  },
  mechanics: {
    main:
      "Space travel is fraught with dangers.A failed life support system can leave a crew desperate to find any haven where they might safely land.A failed hyperspace engine might strand them hopelessly far from the nearest repair yard.Individuals who accept these - dangers need to either have tremendous faith in the quality of their craft or the mechanical skills of its crew.Even in those cases where confidence is based upon a craft's quality and maintenance regimen, the presence of a capable mechanic can still be crucial to the ship's ultimate survival. ",
    list: [
      "Planetary and atmospheric craft, droids, and even a trusty blaster can break down at the least convenient possible moment.These different devices use vastly different technologies, but there are core concepts that any technical expert can carry over from one device to another.The Mechanics skill represents the expertise required for any of these repairs.The skill plays a critical role for any technician, but is also relevant for pilots, survivalists, and anyone else who travels the fringe.",
      "Any device that suffers physical damage may be repaired using the Mechanics skill with proper tools.",
      "A character may use Mechanics prior to beginning a repair job, so that he can identify the parts and tools necessary for the job along with their approximate cost.This information may be particularly useful to a character seeking to pay for repairs.",
      "Sometimes, a character may have access to an extensive supply of discrete components or damaged devices.In this situation, attempts to construct a completely new device are dependent upon the Mechanics skill.",
    ]
  },
  medicine: {
    main:
      "Through the course of their travels, characters are certain to suffer injuries.Minor injuries may not require medical intervention, but more serious ones may need the attentions of a trained professional.The Medicine skill is that training, and can be used to heal cuts and bruises as well as life- threatening injuries.",
    list: [
      "Routine first aid, including medpacs, depend upon a character's abilities in Medicine. Medpacs are mercifully simple to use, but the difficulty may be complicated by the severity of the wound. ",
      "The ability to treat a poison—or to inflict one—falls under the Medicine skill.This also governs the use of pharmaceutical and recreational drugs.",
      "Many planets harbor unique infectious diseases as well as parasites.A well - traveled medical technician may become familiar with both the symptoms and treatments for many such planetary syndromes.",
      "More serious treatments—including surgeries, cybernetic augmentations, and psychotherapy—are governed by Medicine, but generally require additional pharmaceuticals and medical instruments.",
      "The difficulty of the check is based on the target's current state of health. See Table 3-2: Medical Check Difficulty. On a successful check, the target recovers a number of wounds equal to the number of successes generated by the Medicine roll, and an amount of strain equal to the number of advantages generated. Note that a character may attempt only one Medicine check per week when helping a character to recover from critical wounds. Note also that droids may not benefit from Medicine, but they may substitute the Mechanics skill for these same healing checks. Characters attempting to treat their own injuries increase the difficulty of the Medicine check by ◆◆.",
    ]
  },
  melee: {
    main:
      "All ranged weapons require some sort of ammunition and many are loud.They typically have fragile components or require regular maintenance, which may require its own set of tools.By contrast, most melee weapons are inexpensive, virtually silent, and require little maintenance and no power beyond the strength of their wielder's limbs. Virtually any reasonably sturdy object can be used as a makeshift weapon, so a character who has become adept at the Melee skill can often make do with what's available. ",
    list: [
      "The majority of melee weapons depend upon the wielder's strength to inflict damage, but a few have their own energy sources. These weapons—including stun batons, vibroblades, and force pikes—are much more technically sophisticated than a simple club. However, their core principles remain the same. When a character masters the art of striking with one melee weapon, the core concepts translate effectively to other melee weapons. ",
      "Any military training includes at least a basic course in melee combat preparation.In addition, characters who have spent time on primitive worlds may have learned to defend themselves with melee weapons.Aristocrats and nobles, in some systems, may- also learn a number of melee techniques as part of their cultural traditions. ",
      "The difficulty of Melee checks is Average ◆◆ (the difficulty of all melee attacks) unless the opponent is incapable of resisting(in which case it might be easier at the GM's discretion). The difficulty may be modified by maneuvers the character makes and specific combat situational modifiers as described in Chapter VI: Conflict and Combat.",
    ]
  },
  negotiation: {
    main:
      "Often, the easiest way to get someone's cooperation is by giving them exactly what they want. The art of Negotiation deals with determining exactly how much of what a subject wants must be surrendered in order to get a particular good or service in return. A master negotiator might need to make only the most minimal of sacrifices in exchange for a vital service, while a novice could be forced to dramatically overpay—particularly if he lets his desperation show. This skill is essential for anyone who regularly deals in traded goods, but is also vitally important to anyone whose livelihood depends upon selling their services. ",
    list: [
      "Characters need to effectively negotiate if they ever hope to pay down their Obligations.Negotiation is opposed by the subject's Negotiation or Cool. See Social Skill Interactions on this page for more information. ",
      "Any time a character wishes to purchase goods or services, he must either pay the seller's asking price or utilize the Negotiation skill. ",
      "If a character wishes to sell goods or services, the final price is determined by a Negotiation check.",
      "When two individuals create an agreement or treaty, they may make an opposed or competitive Negotiation check.The winner gains the better end of the resulting agreement.",
      "Negotiation is usually an opposed check, using the target's Cool or Negotiation. Situational modifiers may also apply based upon any past relationship between the characters involved and the overall desirability of the goods and services in question. The cases where this skill may be used without an opposed check are exceedingly rare, but the opportunity may present itself. In such a case, the GM is encouraged to gauge the difficulty of the check by the factors mentioned above.",
    ]
  },
  outerRim: {
    main:
      "The systems of the Outer Rim are filled with independent worlds, often inhabited by those who enjoy their isolation and relative freedom.Because of this, the varied worlds exhibit an incredibly diverse mix of different cultures and political systems.In many instances, they also exhibit a broad spectrum of different species that have developed a shared community founded on this diversity. ",
    list: [
      "Because the range of cultures is so great, anything learned about the culture of one world is not necessarily relevant to aspects of other systems in the Outer Rim—even ones that are relatively close.However, there are common attitudes and archetypal settings that are consistent throughout this region of the galaxy.Further, those who travel regularly among these worlds do get to learn of one another, and there are countless dives frequented by those who ply the spacelanes.",
      "If a character needs to find a planet with a particular resource or service among the systems of the Outer Rim, he could make an Outer Rim check to identify the most appropriate and closest options.",
      "When determining the best location to sell a cargo of goods, an Outer Rim check might reveal locations where the goods are legal, desirable, and socially acceptable.",
      "At times when a character must interact with a person from an Outer Rim world, this knowledge skill could be used to determine the most appropriate social actions to take to establish a beneficial relationship.",
      "The difficulty for an Outer Rim check is based upon the obscurity of the world and goods in question.This may also be modified based upon the specificity of the question posed.",
    ]
  },
  perception: {
    main:
      "Characters must often maintain a careful awareness of their environment.Subtle cues can hint at imminent danger or unexpected advantage.The Perception skill represents the character's constant, passive state of awareness. This is how a character notices concealed or subtle cues when he is not actively seeking them out. The skill is critical for anyone who faces dangers on a regular basis—whether they are in the wilds of a frontier world or among the urban jungle of a sprawling city. ",
    list: [
      "Note that Perception encompasses all of a characters natural senses.Humans without cybernetic augmentation are limited to five.However, many alien races have additional means to perceive their surroundings.",
      "If a character is unprepared for a trap or an ambush, he may have an opportunity to make a Perception check to avoid being surprised.Alternatively, this might oppose an attacker's Stealth check. ",
      "Opposed Skulduggery checks are often opposed by a target's Perception. ",
      "Perception may be checked any time the character has an opportunity to notice a subtle clue—an overheard conversation, the stink of a Jawa, or a drug introduced to their beverage.",
      "Perception can be used in surveillance situations, where the user is trying to observe an unaware target from a distance.",
      "Perception may be opposed by skills used for concealment or might have a difficulty set by the environment.The noise of a loud factory could conceal a conversation just as a spicy drink might prevent a character from noticing a poison.",
    ]
  },
  pilotingPlanetary: {
    main:
      "When characters travel across the surface of one of the galaxy's numerous worlds, they often stray far from their spacecraft. Smaller craft, particularly ones best suited to a given planet's habitats, are commonly used for surface transportation.This can include repulsorlift vehicles, watercraft, and aircraft.No matter how the vehicle moves—rolling, gliding, walking, flying, or floating—the skill that governs its use is Piloting(Planetary). ",
    list: [
      "Under normal traffic and environmental conditions, a character should never need to actually check the Piloting(Planetary) skill.Its use is reserved for the most extreme of conditions.This might include a high- speed pursuit, travel in treacherous weather conditions, the use of a failing vehicle, or any combination of these complications.For some, this skill is a passion and a livelihood; for others it is simply a necessity of their lifestyle.",
      "If a character is confronted by a completely foreign type of atmospheric craft, they must make a Piloting(Planetary) check to decipher its basic controls.",
      "Any time two characters are involved in a race upon a world's surface, the results are determined by an opposed check using Piloting (Planetary). ",
      "If a character is either chasing another or being chased, losing the follower or maintaining the tail is done through an opposed Piloting(Planetary) check.",
      "The difficulty of a Piloting(Planetary) check may be determined based upon the difficulty of any particular maneuver, the prevailing weather conditions, and any features or failures on the vehicle involved.",
    ]
  },
  pilotingSpace: {
    main:
      "Those who travel between worlds find their ability to pilot a starship paramount.Some use these craft as weapons of war, working as mercenaries in any of the galaxy's countless conflicts. Others use their vessels to transport desirable goods—either legally or illegally—so that they might be delivered to anxious consumers. Whether a crew is attempting to avoid enemy fire or simply unwanted attention, their success or failure is most often dependent upon the person manning the helm. ",
    list: [
      "Routine actions—like taking off or landing without additional complications—do not require a Piloting(Space) check.When those actions are complicated by a blinding sandstorm, a failed motivator, or enemy fire, then skill checks come into play.",
      "Whenever two or more spaceships race, a competitive Piloting(Space) check determines the results.",
      "Chases, whether they are through asteroid belts, within a crowded battlefield, or skirting the edge of a gravimetric instability, are resolved with an opposed Piloting(Space) check.",
      "During a space conflict, pilots may often jockey for position to determine which shields face the enemy and which weapons may be brought to bear.When opponents attempt to negate these efforts, the winner is identified through an opposed Piloting(Space) check.",
      "The difficulty of a Piloting(Space) check may be determined based upon the difficulty of any particular maneuver, any unusual navigational hazards, and any features or failures on the spacecraft involved.",
    ]
  },
  rangedHeavy: {
    main:
      "When firing upon a target from range, weapons that are held with two hands offer a more stable firing platform than those which are held in a single hand.These also often have longer barrels, providing a consistent fire pattern out to a much longer range.In the larger space required for such armaments, designers can often include a significantly larger ammunition reserve and may also make the weapon far more potent than smaller weapons.This combination can yield weapons that are substantially more deadly and more accurate. ",
    list: [
      "There are countless varieties of rifles used throughout the galaxy.Some are simple slugthrowers, while common blaster rifles range in size from carbines to extended barrel sniper rifles.There are also a number of unique weapons, such as the Wookiee bowcaster.Any of these different weapons depend upon the Ranged(Heavy) skill in their operation. ",
      "In addition to combat uses, Ranged(Heavy) weapons are commonly used for hunting purposes.Because of this, these types of weapons are seen on frontier worlds far more frequently than Ranged(Light) weapons.Characters who are focused 'on their wilderness survival skills may prefer the additional range that a rifle offers when confronting predators. ",
      "Ranged(Heavy) weapons inflict wounds upon targets by default.A subset of the weapons in this category may have a stun option, as do some specialized stun - only weapons.",
      "Ranged(Heavy) check difficulties are determined by the distance to the target.The difficulty may be modified by maneuvers the character makes and specific combat situational modifiers as described in Chapter VI: Conflict and Combat.",
    ]
  },
  rangedLight: {
    main:
      "Many characters prefer to wield a weapon that can be effectively held with one hand, rather than carrying something larger.This may be a preference based upon the ease of concealment, or it could be simply a stylistic choice.Alternatively, some individuals feel that they must be able to keep another hand free, allowing them to, for example, pilot a speeder bike and fire a blaster pistol at the same time. ",
    list: [
      "A broad selection of weapons falls under the category of the Ranged(Light) skill.It includes any weapon that can be fired with one hand, without the benefit of a brace or other support element.Specific examples include countless pistols, but also spears, nets, and thermal detonators.Some are so small as to be easily concealed, while others can only be wielded by the strongest of individuals. ",
      "The Ranged(Light) skill reflects the hand- eye coordination that a character has developed in conjunction with his intuitive grasp of wind resistance, gravity, and distance.Upon first arriving on a planet, an expert in this field may wish to practice his abilities so that he can learn how the world's environs might affect them. ",
      "The vast majority of Ranged(Light) weapons inflict wounds against targets.Those that are capable of inflicting strain are specifically indicated and typically must be adjusted for use in that firing mode.",
      "Characters may wield a Ranged(Light) weapon in each hand, or wield a melee weapon that can reasonably be used one - handed and a Ranged(Light) weapon in the other hand.See page 210 for more information.",
      "Ranged(Light) check difficulties are determined by the distance to the target.The difficulty may be modified by maneuvers the character makes and specific combat situational modifiers as described in Chapter VI: Conflict and Combat.",
    ]
  },
  resilience: {
    main:
      "The galaxy doesn't stop moving lust because a character needs a break. To achieve their objectives, characters must often have the perseverance to overcome the most challenging obstacles. These can include sleep deprivation, hideous climates, and malnutrition. They might also ingest toxins, either inadvertently when scavenging for food or due to the malicious actions of a competitor. ",
    list: [
      "Resilience represents a character's physical fortitude against all threats of this sort. This skill reflects the body's ability to be pushed beyond reasonable limits.When characters make a Resilience check, their actions are typically taking them into situations that most would consider bad ideas.",
      "When a character attempts to go without sleep for significantly longer than is healthy for his species, he must make a Resilience check to remain awake.",
      "If a character ingests a toxin, he uses Resilience to resist its effects.",
      "When a character endures prolonged exposure to a hostile environment—including heat, cold, or toxic pollution—the consequences may be mitigated with a successful Resilience check.",
      "Dehydration and malnutrition can quickly leave a character badly fatigued, and Resistance protects against this.",
      "The difficulty for a Resilience check is based upon the severity of the effects that the character attempts to overcome.Going 24 hours without sleep could add only a single ◆, but traveling through the Tatooine desert with inadequate water at midday should be far more difficult.",
    ]
  },
  skulduggery: {
    main:
      "Skulduggery encompasses a broad range of skills that are crucial to performing criminal actions.These include the physical abilities to perform a crime as well as the mental familiarity with different techniques.This includes picking pockets and locks, breaking into and out of secure facilities, sleight of hand, disguise, setting traps, and other mischievous actions.At the Game Master's discretion, a particular Skulduggery check may use Agility instead of Cunning, to reflect a more physical approach. ",
    list: [
      "If a character attempts to pick a lock or pocket, he often uses Skulduggery.Some electronic locks could require Computers or Skulduggery, or both.",
      "Once an imprisoned character slipped his bonds using Coordination, escaping from a cell depends upon Skulduggery for picking locks and avoiding security.",
      "Identifying the most vulnerable aspects of a security scheme can be nearly intuitive for a character that has become practiced in Skulduggery.",
      "Skulduggery is often opposed by a target's Perception. In instances where another character is not directly involved, the quality of the object being overcome should determine the degree of difficulty.",
    ]
  },
  stealth: {
    main:
      "Often, a character may have business to conduct that is best completed with a certain degree of privacy.It might be that there are powerful individuals—either legal or criminal authorities—who are directly opposed to his choice of actions.Other times, a character might either be collecting or avoiding a bounty.Under such conditions, a successful endeavor may depend entirely upon how talented the character is at not being noticed.The Stealth skill reflects this ability under virtually all situations. ",
    list: [
      "Any criminal that depends upon physical insertion must be a master of this trade.Similarly, anyone whose skills include espionage needs to be able to avoid notice.Stealth also encompasses wilderness camouflage skills, which may be crucial to any hunter.",
      "Attempts to hide from all of an opponent's senses are dependent upon Stealth, though difficulties may be modified by ambient conditions and any applicable gear. ",
      "Stealth can allow characters to shadow or follow individuals without being detected.",
      "Characters may attempt to hide people or objects from the attentions of others, either through concealment or misdirection.Such actions are dependent upon their Stealth skill.",
      "The difficulty of a Stealth check often depends on the abilities of those the character is attempting to avoid.Members of species that are more dependent upon smell, hearing, or other senses may be most susceptible to Stealth under different weather conditions or distracted by events that seem trivial to a species focused on visual cues.",
      "Stealth checks are typically opposed by Perception, based upon whether the opponent is passively or actively searching for the hidden character.",
    ]
  },
  streatwise: {
    main:
      "Life on the galaxy's fringe—and in the less savory portions of the Core Worlds—is filled with treachery. A stranger can seldom be trusted, and a friend might turn traitor for the right compensation. Those who manage to survive in such an environment soon learn to recognize the warning signs that come with danger as well as those that might signal an opportunity. Knowing where to go for help when times are hard can be just as important as knowing how to avoid an unwinnable confrontation. ",
    list: [
      "The Streetwise skill represents the instinctive understanding that comes from a lifetime of such experiences.While a few manage to learn the signs and develop a gut instinct through careful study and association with those who have lived this hard life, most come about this information through the school of hard knocks.If a character expects to thrive within the complex network of the criminal underworld, he must learn to speak its language and recognize the roles of those involved.",
      "If a character is looking for a merchant who specializes in unsavory goods or illicit services, such a merchant may be located through a Streetwise check.",
      "Streetwise represents a character's instinct for how to pick up on subtle cues from the language and attitudes of those who operate outside of legal structures. It may be used to understand subtle references within conversations. ",
      "When dealing with criminals or underworld elements, knowing how to approach them and open a conversation without coming across as a threat uses Streetwise.",
      "Generally, Knowledge(Underworld) governs specific information and facts involving criminals and underworld elements.Streetwise governs how to use that information effectively, and how to operate in any criminal environment.Extra ☼ on a Streetwise check may be used to reduce the time or funds required to obtain the item, service, or information sought.",
    ]
  },
  survival: {
    main:
      "It is not uncommon for characters to become isolated far from civilized worlds.Sometimes this is by choice, other times, they could be stranded on a world, hoping for some sort of rescue.Learning to recognize the dangers of the natural environment as well as exploiting its resources is dependent upon the Survival skill. ",
    list: [
      "Characters who spent their formative years on wilderness planets often have this skill as part of their background.Others may learn it as part of military training.Some may be completely dependent upon it as their job focuses on traveling to untamed worlds so that they may exploit their natural resources.",
      "When a character needs to identify safe food, potable water, or shelter in a natural environment, each of these tasks requires a Survival check.",
      "Characters who are skilled at Survival understand weather patterns; recognizing the signs of imminent dangerous conditions, and knowing how to prepare.",
      "Tracking a subject through the wilderness—whether game or a bounty—is dependent upon, Survival.",
      "Survival governs a character's ability to handle domesticated animals, so that they may be used as beasts of burden or as transport. ",
      "The difficulty for a Survival check is dependent upon the severity of the environment.Key factors are the biocompatibility of a world's native life with the PC, weather conditions, and the basic tools on hand.",
    ]
  },
  underworld: {
    main:
      "In some places, criminal elements control the government through less than legal machinations.In others, the crime families function as the only effective ruling force.In more traditionally governed areas, seedier elements are dependent upon secrecy and deception as the core elements of their practices.Before a character can even begin to establish contacts among a world's criminal elements, he must first understand which of these organizational structures are in play. ",
    list: [
      "Once a character deciphers how he might establish a contact, he must next find out with whom he needs to speak.Different groups or individuals might control different parts of the criminal trade.A contact for gambling is likely different than one who deals in illicit pharmaceuticals, while a third individual is likely the point of contact for military grade weapons.Depending upon a character's needs and the criminal elements active on a world, finding the right contact could be trivial or extremely time-consuming. ",
      "The Underworld skill may be used to know which nearby worlds are the best locations for a particular type of illegal business.",
      "A familiarity with Underworld may be useful if the characters need to determine the most common methods that an opponent might use for a particular type of criminal activity.",
      "When the criminal nature of a location or individual is well known, recalling the relevant data should be easy.The difficulty of the task should be much more challenging if the individual has gone to lengths to conceal his illegal activities.",
    ]
  },
  vigilance: {
    main:
      "In uncertain times, individuals who are constantly prepared to face a variety of challenges are far more likely to succeed than those who simply react to the ever- changing circumstance.This sort of preparedness requires mental discipline, and can require instantaneous decisions when disaster or unexpected events suddenly strike. ",
    list: [
      "Characters who must remain alert because of the nature of their lifestyles are often particularly vigilant.This includes those who live within hostile environments—either urban jungles or dangerous wilderness—as well as professional soldiers.This skill is often associated with a high degree of self- assuredness.",
      "In combat situations, outside of those times when a character has patiently prepared to begin the engagement, Vigilance is used to calculate Initiative.",
      "Vigilance represents how fastidious a character is about preparing for unexpected crises.Any time there is a question regarding whether a small piece of gear might be available, a Vigilance check can be made to confirm its presence.",
      "The difficulty for a Vigilance check is typically modified by the likelihood of the incident that occurs.A character might be prepared for an ambush when traveling a darkened alley, but is unlikely to expect a groundquake in the middle of the night.A poor result on such a check might leave the character momentarily unable to act as he mentally attempts to decipher the current situation.",
    ]
  },
  xenology: {
    main:
      "The motivations, biological origins, and philosophies of the galaxy's varied species are hugely divergent. An object that is desirable to members of one species could be repugnant to another. Even within a species, the cultures from different systems can have completely different ideological and social practices. Those who have mentally catalogued the different species of the galaxy and learned their distinctive traits are skilled at Xenology. ",
    list: [
      "Anyone who must regularly interact with the inhabitants of the galaxy's varied worlds must become adept at Xenology. This is particularly vital for anyone who might need to offer medical treatment to members of varied species, as differences in basic anatomy and biochemistry can make drugs effective in one species lethal to another. Knowledge of the varied cultural traits is also vital for a character who interacts in a social fashion. A bargaining tactic that is perfectly effective against a Twi'lek might be disastrous when used on a Wookiee.",
      "When a character first encounters a member of an unfamiliar race, a Xenology check may be made to identify the typical way to interact with that character socially.This may be used to avert any major gaffe.",
      "If a character needs to either help or harm a member of another species, Xenology may assist him in identifying a type of injury or in pointing out a characteristic vulnerability.",
      "Different species need substantially different environmental conditions and foodstuffs.A Xenology check may allow a character to offer the appropriate considerations to a guest.",
      "The difficulty for a Xenology check should be based upon both how often the acting character interacts with the members of the species in question and the relative rarity of that species.",
    ]
  },
  warfare: {
    main:
      "The Star Wars galaxy has been shaped for millennia by warfare.From the ancient conflicts that established the Galactic Republic to the Clone Wars mere decades ago, warfare has played a large part in the history and lives of beings throughout the galaxy.Now, as the Rebel Alliance engages in its desperate struggle against the Galactic Empire, characters with knowledge on the workings of war are more important than ever before. ",
    list: [
      "This skill covers a characters knowledge of conflict, both on the ground and in space.Many things factor into this, from training and insight on the strategies and tactics of modern warfare, to an awareness of the personnel and technology of the factions involved in the conflict, to knowledge gained from studying the other great wars throughout galactic history.Having a broad awareness of the workings and history of conflict allows a character to not only to survive, but to thrive in the Rebel Alliance.",
      "A character's knowledge of the strategies and tactics of warfare both on the ground and in space is represented by the Warfare skill. ",
      "Any time a character wants to remember details about a significant event, organization, or individual who played a role in a galactic struggle, he should make a Warfare check.",
      "The difficulty of the Warfare check is based upon how hard it would be to acquire the information the character wishes to know.Classified, highly localized, or ancient information is obviously more obscure, while standardized structures and patterns that the character has encountered before are much easier to remember.",
    ]
  },
  cybernetics: {
    main:
      "At the GM's and players' discretion, Cybernetics can be presented as a custom skill rather than as a specific use of Mechanics and Medicine.The introduction of this skill is optional. ",
    list: [
      "If introduced, Cybernetics is used for building, modifying, and installing cybernetic enhancements and replacements(see page 85 of the Special Modifications Technician Source Book), as well as other checks at the GM's discretion. Talents that apply to Mechanics or Medicine checks might apply to Cybernetics checks at the GM's discretion.The Cyber Tech should recieve Cybernetics as an additional bonus career skill.",
    ]
  },
}