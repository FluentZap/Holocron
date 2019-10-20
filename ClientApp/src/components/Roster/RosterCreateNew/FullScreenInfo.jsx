import React, { useEffect } from 'react';

const FullScreenInfo = ({ text, onClick }) => {

  return <>
    <div className='flex-center data-panel red-flat scanlines-back m2 p2 z-overlay' style={{gridArea: '4 / 1 / span 37 / span 22', justifyContent: 'start' }} />
    <div className='flex-center z-overlay-child m2' style={{gridArea: '8 / 2 / span 32 / span 20', display: 'block', overflowY: 'auto', width: '99%', margin: '.5vh 0' }} >
      <div className='z-5 p4 flex-left data-panel gray-flat font-small'
        style={{marginLeft: '.5vh', marginRight: '.5vh' }}>
        <div dangerouslySetInnerHTML={{ __html: text }} />
      </div>
    </div>
    <div className='flex-center data-panel blue-glow scanlines-back m2 p2 z-overlay-child'
      style={{gridArea: '5 / 2 / span 3 / span 20' }}
      onClick={onClick}
    >Return</div>
  </>
}

export default FullScreenInfo;