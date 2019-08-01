import React from 'react';
import uuid from 'uuid';
import './CharacterCardStyles.css';
import FadeInBuilder from '../../FadeInBuilder';

const boxFade = new FadeInBuilder(0.3, 0.5, 8);

const CharacterCard = ({ fadeDelay, stats }) => {
    return (
        <div className='animate-fade-in roster-character-card' style={{ gridArea: '3 / 1 / span 10 / span 20', animationDelay: fadeDelay }}>
            <div className='data-panel red-flat scanlines-back m2 p2' style={{ gridArea: '1 / 1 / span 10 / span 20' }} />

            <div className='font-small animate-fade-in z-5 m2 p2 flex-left data-panel gray-flat scanlines-back'
                style={{ gridArea: '2 / 7 / span 2 / span 13', animationDelay: boxFade() }}>
                Name: {stats ? stats.name : ''}</div>

            <div className='font-small animate-fade-in z-5 m2 p2 flex-left data-panel gray-flat scanlines-back'
                style={{ gridArea: '4 / 7 / span 2 / span 8', animationDelay: boxFade() }}>
                Species: {stats.species}
            </div>
            <div className='font-small animate-fade-in z-5 m2 p2 flex-left data-panel gray-flat scanlines-back'
                style={{ gridArea: '4 / 15 / span 2 / span 5', animationDelay: boxFade() }}>
                {stats.career}
            </div>

            <div className='font-small animate-fade-in z-5 m2 p2 flex-left data-panel gray-flat scanlines-back'
                style={{ gridArea: '6 / 7 / span 4 / span 4', animationDelay: boxFade() }}>
                <div>Wounds</div>
                <div>{stats.wound} / {stats.woundThreshold}</div>
            </div>
            <div className='font-small animate-fade-in z-5 m2 p2 flex-left data-panel gray-flat scanlines-back'
                style={{ gridArea: '6 / 11 / span 4 / span 4', animationDelay: boxFade() }}>
                <div>Strain</div>
                <div>{stats.strain} / {stats.strainThreshold}</div>
            </div>
            <div className='font-small animate-fade-in z-5 m2 p2 flex-left data-panel gray-flat scanlines-back'
                style={{ gridArea: '6 / 15 / span 4 / span 5', animationDelay: boxFade() }}>
                {stats.specializations.map(spec => <div key={uuid.v4()}>{spec}</div>)}
            </div>


            <div className='font-small animate-fade-in z-5 m2 p2 flex-left data-panel gray-flat scanlines-back'
                style={{ gridArea: '2 / 2 / span 5 / span 5', animationDelay: boxFade() }}>
                {/* PIC */}
            </div>
            <div className='font-small animate-fade-in z-5 m2 p1 flex-left data-panel gray-flat scanlines-back'
                style={{ gridArea: '7 / 2 / span 3 / span 5', animationDelay: boxFade() }}>
                <div>xp {stats.xp}</div>
                <div style={{ flexDirection: 'row', display: 'flex' }}>
                    <div className='credits' />
                    {stats.credits}
                </div>
            </div>


        </div>
    );
}

export default CharacterCard;
