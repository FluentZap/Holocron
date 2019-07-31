import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { navigate } from "@reach/router";
import uuid from 'uuid';
import './RosterCreateNewStyles.css';

const getRandomArray = (min, max, count) => {
  let numbers = [];
  let step = (max - min) / count;
  for (let x = min; x <= max; x += step) {
    numbers.push(x);
  }
  return shuffle(numbers)
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  console.log(array);

  return array;
}

const fadeIn = getRandomArray(0, 0.3, 5);


function Roster(props) {
  const { characters } = props;

  const [stats, setStats] = useState({
    brawn: 3,
    agility: 1,
    intellect: 2,
    cunning: 2,
    willpower: 2,
    presence: 2,
  });

  const [selectStat, setselectStat] = useState('')


  const StatBox = ({name, value}) => {
    let classes = 'roster-new-characteristics-box flex-center data-panel blue-glow scanlines-back font-small';
    if (name === selectStat) {
      classes += ' roster-detail-selected'
    }
    return <div onClick={() => {setselectStat(name)}} className={classes}>
        {name} {value}
        <br />
        {(value + 1) * 10} xp
    </div>
  }


  return (
    <div className='flex-center full-screen'>
      <div className='data-container'>
        <button onClick={() => navigate('/menu')} className='animate-fade-in flex-center data-panel red-glow scanlines' style={{ gridArea: '1 / 1 / span 1 / span 4', margin: 5, animationDelay: fadeIn[0] + 's' }}>Menu</button>
        <div className='animate-fade-in flex-center data-panel red-glow scanlines' style={{ gridArea: '2 / 1 / span 3 / span 9', margin: 5, animationDelay: fadeIn[1] + 's' }} />
        <div className='roster-new-characteristics-list animate-fade-in flex-center data-panel red-flat scanlines-back' style={{ gridArea: '5 / 1 / span 12 / span 3', margin: 5, animationDelay: fadeIn[2] + 's' }}>
          <StatBox name={'Brawn'} value={stats.brawn} />
          <StatBox name={'Agility'} value={stats.agility} />
          <StatBox name={'Intellect'} value={stats.intellect} />
          <StatBox name={'Cunning'} value={stats.cunning} />
          <StatBox name={'Willpower'} value={stats.willpower} />
          <StatBox name={'Presence'} value={stats.presence} />
        </div>


        <div className='animate-fade-in flex-center data-panel red-glow scanlines' style={{ gridArea: '5 / 4 / span 4 / span 6', margin: 5, animationDelay: fadeIn[3] + 's' }} />
        <div className='animate-fade-in flex-center data-panel red-glow scanlines' style={{ gridArea: '9 / 4 / span 4 / span 6', margin: 5, animationDelay: fadeIn[4] + 's' }} />
        <div className='animate-fade-in flex-center data-panel red-glow scanlines' style={{ gridArea: '13 / 4 / span 4 / span 6', margin: 5, animationDelay: fadeIn[5] + 's' }} />
      </div>
    </div>
  );
}


function mapStateToProps(state) {
  return {
    characters: state.characters
  };
}

export default connect(mapStateToProps)(Roster);
