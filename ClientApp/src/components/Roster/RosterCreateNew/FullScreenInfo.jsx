import React from 'react';

const FullScreenInfo = ({ text, onClick }) => {
  return <>
    <div className='animate-fade-in flex-center data-panel red-flat scanlines-back m2 p2 z-overlay' style={{ gridArea: '4 / 1 / span 37 / span 20', justifyContent: 'start' }} />    
    <div className='flex-center z-overlay-child m2' style={{ gridArea: '8 / 2 / span 32 / span 18', display: 'block', overflowY: 'auto', width: '99%', margin: '.5vmin 0' }} >
      <div className='animate-fade-in z-5 p2 flex-left data-panel gray-flat font-small'
        style={{ animationDelay: 0.2, marginLeft: '.5vmin', marginRight: '.5vmin' }}>
        <div dangerouslySetInnerHTML={{ __html: text }} />
      </div>
    </div>
    <div className='animate-fade-in flex-center data-panel blue-glow scanlines-back m2 p2 z-overlay-child' 
    style={{ gridArea: '5 / 2 / span 3 / span 18' }} 
    onClick={onClick}
    >Return</div>
  </>
}

export default FullScreenInfo;