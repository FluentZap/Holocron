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


const CharacterCard = ({ fadeDelay, stats, newCharacter }) => {
    return (
        <div className='animate-fade-in roster-character-card' style={{ gridArea: '4 / 1 / span 10 / span 20', animationDelay: fadeDelay }}>
            <div className='data-panel red-flat scanlines-back m2 p2' style={{ gridArea: '1 / 1 / span 10 / span 20' }} />
            <TextBox area={[2, 7, 2, 13]} delay={boxFade()}
                text={`Name: ${stats.name}`} edit={newCharacter} />

            <TextBox area={[4, 7, 2, 8]} delay={boxFade()}
                text={`Species: ${stats.species}`} edit={newCharacter}/>

            <TextBox area={[4, 15, 2, 5]} delay={boxFade()}
                text={stats.career}/>

            <TextBox area={[6, 7, 4, 4]} delay={boxFade()}
                text={<>
                    <div>Wounds</div>
                    <div>{stats.wound} / {stats.woundThreshold}</div>
                </>} />
            <TextBox area={[6, 11, 4, 4]} delay={boxFade()}
                text={<>
                    <div>Strain</div>
                    <div>{stats.strain} / {stats.strainThreshold}</div>
                </>} />
            <TextBox area={[6, 15, 4, 5]} delay={boxFade()}
                text={stats.specializations.split(',').map(spec => <div key={uuid.v4()}>{spec}</div>)} />

            <TextBox area={[2, 2, 5, 5]} delay={boxFade()}
                text={''} />

            <TextBox area={[7, 2, 3, 5]} delay={boxFade()}
                text={<>
                    <div>xp {stats.xp}</div>
                    <div style={{ flexDirection: 'row', display: 'flex' }}>
                        <div className='credits' />
                        {stats.credits}
                    </div>
                </>} />
        </div>
    );
}

export default CharacterCard;