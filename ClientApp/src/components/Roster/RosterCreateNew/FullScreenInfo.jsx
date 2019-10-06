import React, { useEffect } from 'react';
import { a } from 'react-spring'
import FadeInBuilder from '../../FadeInBuilder';

const FullScreenInfo = ({ text, onClick }) => {
  const [setFade, getFade] = new FadeInBuilder();

  useEffect(() => {
    setFade({ opacity: 1 })
  })

  return <>
    <a.div className='flex-center data-panel red-flat scanlines-back m2 p2 z-overlay' style={{ ...getFade(), gridArea: '4 / 1 / span 37 / span 20', justifyContent: 'start' }} />
    <a.div className='flex-center z-overlay-child m2' style={{ ...getFade(), gridArea: '8 / 2 / span 32 / span 18', display: 'block', overflowY: 'auto', width: '99%', margin: '.5vmin 0' }} >
      <a.div className='z-5 p4 flex-left data-panel gray-flat font-small'
        style={{ ...getFade(), marginLeft: '.5vmin', marginRight: '.5vmin' }}>
        <div dangerouslySetInnerHTML={{ __html: text }} />
      </a.div>
    </a.div>
    <a.div className='flex-center data-panel blue-glow scanlines-back m2 p2 z-overlay-child'
      style={{ ...getFade(), gridArea: '5 / 2 / span 3 / span 18' }}
      onClick={onClick}
    >Return</a.div>
  </>
}

export default FullScreenInfo;