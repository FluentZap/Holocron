import React, { useRef, useEffect } from 'react';

export function ScrollPanel({ gridArea, className, children, reset }) {
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

export function Panel({ gridArea, className, children }) {
  return (
    <div className={`flex-center data-panel ${className} scanlines-back m2 p2`} style={{ gridArea: gridArea, justifyContent: 'start' }} >
      {children}
    </div>
  )
};

export function Button({ onClick, className, gridArea, children }) {
  return <button onClick={onClick} className={`${className} flex-center center data-panel scanlines-back m2`}
    style={{ gridArea: gridArea }}>{children}</button>
}