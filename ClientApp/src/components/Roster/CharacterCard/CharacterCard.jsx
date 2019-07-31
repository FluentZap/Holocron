import React from 'react';
import { connect } from 'react-redux'
import { navigate } from "@reach/router";
import './CharacterCardStyles.css';

const CharacterCard = ({ fadeDelay, character }) => {
    return (
        <div className='animate-fade-in data-panel red-flat scanlines-back roster-character-card' style={{ gridArea: '2 / 1 / span 3 / span 9', margin: 5, animationDelay: fadeDelay }}>
            <div
                className='flex-center data-panel gray-flat roster-character-card-image scanlines-back'
                style={{ gridArea: '1 / 1 / span 2 / span 2' }}></div>
        </div>
    );
}

export default CharacterCard;
