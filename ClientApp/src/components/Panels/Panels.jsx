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

export function Panel({ area, className, children }) {
  return (
    <div className={`flex-center data-panel ${className} scanlines-back m2 p2`} style={{
      gridArea: `${area[0]} / ${area[1]} / span ${area[2]} / span ${area[3]}`, justifyContent: 'start'
    }} >
      {children}
    </div>
  )
};

export function Button({ onClick, className, area, children }) {
  return <button onClick={onClick} className={`${className} flex-center center data-panel scanlines-back m2`}
    style={{ gridArea: `${area[0]} / ${area[1]} / span ${area[2]} / span ${area[3]}` }}>{children}</button>
}

export function CRend(condition, valueTrue, valueFalse, classNames) {
  if (classNames === undefined) {
    classNames = '';
  }
  return (condition ? valueTrue : valueFalse) + " " + classNames;
}

export const TextBox = (props) => {
  let { text, area, className, edit, fade, onChange, type, alert, onAnimationEnd } = props;
  if (!className) className = '';
  if (alert) className += ' reject-animation';

  return edit ?
    <input onAnimationEnd={onAnimationEnd} type={type} onChange={onChange} className={className + ' font-small z-5 m2 p2 flex-left data-panel blue-glow scanlines-back roster-text'}
      style={{ ...fade, gridArea: `${area[0]} / ${area[1]} / span ${area[2]} / span ${area[3]}` }} placeholder={text} />
    :
    <div type={type} className={className + ' font-small z-5 m2 p2 flex-left data-panel gray-flat scanlines-back roster-text'}
      style={{ ...fade, gridArea: `${area[0]} / ${area[1]} / span ${area[2]} / span ${area[3]}` }} placeholder={text}>
      {text}</div>
}