import React, { useEffect, useState, memo } from 'react';
import uuid from 'uuid';
import './CharacterCardStyles.css';

export const TextBox = ({ text, area, className, edit, fade, onChange }) => {
	if (!className) className = '';
	return edit === true ?
		<input onChange={onChange} className={className + ' font-small z-5 m2 p2 flex-left data-panel blue-glow scanlines-back roster-text'}
			style={{ ...fade, gridArea: `${area[0]} / ${area[1]} / span ${area[2]} / span ${area[3]}` }} placeholder={text} />
		:
		<div className={className + ' font-small z-5 m2 p2 flex-left data-panel gray-flat scanlines-back roster-text'}
			style={{ ...fade, gridArea: `${area[0]} / ${area[1]} / span ${area[2]} / span ${area[3]}` }} placeholder={text}>
			{text}</div>
}


const CharacterCard = ({ ds, character, character: { name, species, career, wound, woundThreshold, strain, strainThreshold, specializations, unusedXp, credits }, setCharacter }) => {

	const changeName = val => {
		setCharacter({ ...character, name: val.target.value})		
	}

	return (
		<div className='roster-character-card' style={{ gridArea: '4 / 1 / span 10 / span 22' }}>
			<div className='data-panel red-flat scanlines-back m2 p2' style={{ gridArea: '1 / 1 / span 10 / span 22' }} />
			<TextBox area={[2, 7, 2, 13]}
				text={`Name: ${name}`} edit={true} onChange={changeName} />

			<TextBox area={[4, 7, 2, 8]}
				text={`${ds.species[species].Name}`} />

			<TextBox area={[4, 15, 2, 5]}
				text={ds.careers[career].Name} />
			{/* <div className={'font-small z-5 m2 p2 flex-left data-panel gray-flat-hover scanlines-back roster-text '}
                style={{ gridArea: `4 / 15 / span 2 / span 5`, animationDelay: getFade() }}>{stats.career}</div> */}

			<TextBox area={[6, 7, 4, 4]}
				text={<>
					<div>Wounds</div>
					<div>{wound} / {woundThreshold}</div>
				</>} />
			<TextBox area={[6, 11, 4, 4]}
				text={<>
					<div>Strain</div>
					<div>{strain} / {strainThreshold}</div>
				</>} />
			<TextBox area={[6, 15, 4, 5]}
				text={specializations.map(spec => spec !== '' ? <div className='center' key={uuid.v4()}>{ds.specializations[spec].Name[0]}</div> : '')} />

			<TextBox area={[2, 2, 5, 5]}
				text={''} />

			<TextBox area={[7, 2, 3, 5]}
				text={<>
					<div>xp {unusedXp}</div>
					<div style={{ flexDirection: 'row', display: 'flex' }}>
						<div className='credits' />
						{credits}
					</div>
				</>} />
		</div>
	);
}

export default CharacterCard;
