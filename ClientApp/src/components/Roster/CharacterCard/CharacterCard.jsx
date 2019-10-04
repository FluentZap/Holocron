import React from 'react';
import uuid from 'uuid';
import './CharacterCardStyles.css';
import FadeInBuilder from '../../FadeInBuilder';

const boxFade = new FadeInBuilder(0.3, 0.5, 8);

export const TextBox = ({ text, area, delay, className, edit }) => {
	if (!className) className = '';
	return edit === true ?
		<input className={'font-small animate-fade-in z-5 m2 p2 flex-left data-panel gray-flat scanlines-back roster-text ' + className}
			style={{ gridArea: `${area[0]} / ${area[1]} / span ${area[2]} / span ${area[3]}`, animationDelay: delay }} placeholder={text} />
		:
		<div className={'font-small animate-fade-in z-5 m2 p2 flex-left data-panel gray-flat scanlines-back roster-text ' + className}
			style={{ gridArea: `${area[0]} / ${area[1]} / span ${area[2]} / span ${area[3]}`, animationDelay: delay }} placeholder={text}>
			{text}</div>
}


const CharacterCard = ({ fadeDelay, character }) => {
	return (
		<div className='animate-fade-in roster-character-card' style={{ gridArea: '4 / 1 / span 10 / span 20', animationDelay: fadeDelay }}>
			<div className='data-panel red-flat scanlines-back m2 p2' style={{ gridArea: '1 / 1 / span 10 / span 20' }} />
			<TextBox area={[2, 7, 2, 13]} delay={boxFade()}
				text={`Name: ${character.name}`} edit={true} />

			<TextBox area={[4, 7, 2, 8]} delay={boxFade()}
				text={`${character.speciesName}`} />

			<TextBox area={[4, 15, 2, 5]} delay={boxFade()}
				text={character.career} />
			{/* <div className={'font-small animate-fade-in z-5 m2 p2 flex-left data-panel gray-flat-hover scanlines-back roster-text '}
                style={{ gridArea: `4 / 15 / span 2 / span 5`, animationDelay: boxFade() }}>{stats.career}</div> */}

			<TextBox area={[6, 7, 4, 4]} delay={boxFade()}
				text={<>
					<div>Wounds</div>
					<div>{character.wound} / {character.woundThreshold}</div>
				</>} />
			<TextBox area={[6, 11, 4, 4]} delay={boxFade()}
				text={<>
					<div>Strain</div>
					<div>{character.strain} / {character.strainThreshold}</div>
				</>} />
			<TextBox area={[6, 15, 4, 5]} delay={boxFade()}
				text={character.specializations.split(',').map(spec => <div key={uuid.v4()}>{spec}</div>)} />

			<TextBox area={[2, 2, 5, 5]} delay={boxFade()}
				text={''} />

			<TextBox area={[7, 2, 3, 5]} delay={boxFade()}
				text={<>
					<div>xp {character.unusedXp}</div>
					<div style={{ flexDirection: 'row', display: 'flex' }}>
						<div className='credits' />
						{character.credits}
					</div>
				</>} />
		</div>
	);
}

export default CharacterCard;
