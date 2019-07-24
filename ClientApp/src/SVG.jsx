import React from 'react';

export const SquareButtonSVG = (
  style = {},
  fill = "#000",
  width = "100%",
  height = "100%",
  className = "",
  viewBox = "0 0 105.83 105.83") => (
    <svg
      width={width}
      height={height}
      style={style}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      className={`svg-icon ${className || ""}`}
    >
      <g transform="translate(.0070556 -191.17)" fill={fill} stroke="#000" stroke-width=".79375">
        <path d="m-1e-8 201.75 10.583-10.583h84.667l10.583 10.583v84.667l-10.583 10.583h-84.667l-10.583-10.583z" />
        <path d="m5.2917 204.4 7.9375-7.9375h79.375l7.9375 7.9375v79.375l-7.9375 7.9375h-79.375l-7.9375-7.9375z" />
      </g>
    </svg>
  )

export const HolocronSVG = (
  props,
  style = {},
  fill = "#b30000",
  width = "100%",
  height = "100%",
  className = "",
  translate,
  viewBox = "0 0 8.4808 8.4916") => {

  console.log(props);

  return (
    <svg version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(0 -266.17)" stroke="#ebe6de" stroke-linecap="round">
        <g fill="#3642d9" stroke-width="2">
          <rect x="2" y="268.17" width="96" height="96" rx="0" ry="0" style={{ paintOrder: 'normal' }} />
          <circle cx="50" cy="316.17" r="47" stroke-linejoin="round" style={{ paintOrder: 'normal' }} />
          <rect transform="rotate(45)" x="226.39" y="155.68" width="65.054" height="65.054" stroke-linejoin="round" style={{ paintOrder: 'normal' }} />
        </g>
        <g fill="none">
          <circle cx="50" cy="316.17" r="32" stroke-linejoin="round" stroke-width="2" style={{ paintOrder: 'normal' }} />
          <ellipse cx="50" cy="316.17" rx="10.007" ry="31.39" stroke-linejoin="round" stroke-width="1.4862" style={{ paintOrder: 'normal' }} />
          <rect transform="rotate(-45)" x="-194.57" y="252.55" width="12.728" height="12.728" stroke-width="1.35" style={{ paintOrder: 'normal' }} />
        </g>
      </g>
    </svg>


  )
}


export const NavMenuSVG = props => {
  const width = props.width || '100%';
  // const height = props.height || '100%';
  
  return (
    <svg width={width} version="1.1" viewBox="0 0 120.91459 32.080728" xmlns="http://www.w3.org/2000/svg">
    <defs>
     <linearGradient id="linearGradient6446" x1="72.76" x2="72.76" y1="52.26" y2="39.031" gradientUnits="userSpaceOnUse">
      <stop offset="0"/>
      <stop stopOpacity="0" offset="1"/>
     </linearGradient>
    </defs>
    <g transform="translate(-6.35 -24.215)" stroke="#fff">
     <path d="m6.6146 53.583h6.6146c2.6458 0 3.9688-2.6458 6.6146-2.6458h19.844c2.6458 0 3.9688 2.6458 6.6146 2.6458h66.146c7.9375 0 14.552-6.6146 14.552-14.552v-14.552h-2.6458v1.3229h-3.9688v-1.3229h-100.54v1.3229h-6.6146l-1.3229-1.3229h-5.2917z" fill="url(#linearGradient6446)" strokeLinejoin="round" strokeWidth=".52917"/>
     <circle cx="112.45" cy="39.031" r="12.686" strokeWidth=".52917"/>
     <path d="m13.229 53.583h2.6458c2.6458 1e-6 2.6458 2.6458 5.2917 2.6458h17.198c2.6458 0 2.6458-2.6458 5.2917-2.6458l2.6458 1e-6" fill="none" strokeWidth=".13229"/>
    </g>
   </svg>
   
  )
}