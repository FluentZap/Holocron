import React, { useRef, useEffect } from 'react';

function ScrollPanel({ gridArea, className, children, reset }) {
  const panelRef = useRef(null)

  useEffect(() => {
    if (reset) {
      panelRef.current.scrollTop = 0;
    }
  });

  return (
    <div className={`flex-center data-panel ${className} scanlines-back m2 p2`} style={{ gridArea: gridArea, justifyContent: 'start' }} >
      <div ref={panelRef} className='flex-center' style={{ display: 'block', overflowY: 'auto', width: '99%', margin: '.5vh 0' }} >
        {children}
      </div>
    </div>
  )
};

export default ScrollPanel