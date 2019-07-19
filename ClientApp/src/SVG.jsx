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
          <rect x="2" y="268.17" width="96" height="96" rx="0" ry="0" style={{paintOrder: 'normal'}} />
          <circle cx="50" cy="316.17" r="47" stroke-linejoin="round" style={{paintOrder: 'normal'}} />
          <rect transform="rotate(45)" x="226.39" y="155.68" width="65.054" height="65.054" stroke-linejoin="round" style={{paintOrder: 'normal'}} />
        </g>
        <g fill="none">
          <circle cx="50" cy="316.17" r="32" stroke-linejoin="round" stroke-width="2" style={{paintOrder: 'normal'}} />
          <ellipse cx="50" cy="316.17" rx="10.007" ry="31.39" stroke-linejoin="round" stroke-width="1.4862" style={{paintOrder: 'normal'}} />
          <rect transform="rotate(-45)" x="-194.57" y="252.55" width="12.728" height="12.728" stroke-width="1.35" style={{paintOrder: 'normal'}} />
        </g>
      </g>
    </svg>


  )
}