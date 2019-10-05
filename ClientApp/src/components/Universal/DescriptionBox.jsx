import React from 'react';

const DescriptionBox = ({ text, setShowInfo }) => {
  return <div className='animate-fade-in z-5 m2 p3 flex-left data-panel gray-flat font-small'
    style={{ animationDelay: 0, marginBottom: 0, marginTop: 0 }}>

    <div className={`animate-fade-in z-5 m2 p2 flex-center center data-panel font-small gray-flat-hover half-width`}
      onClick={() => {
        setShowInfo(text);
      }}
    >Expand</div>
    <div dangerouslySetInnerHTML={{ __html: text }} />
  </div>
}

export default DescriptionBox