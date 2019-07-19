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
  style = {},
  fill = "#000",
  width = "100%",
  height = "100%",
  className = "",
  viewBox = "0 0 8.4808 8.4916") => (
    <svg
      width={width}
      height={height}
      style={style}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      className={`svg-icon ${className || ""}`}
    >
      <g transform="translate(.0070556 -288.52)" fill={fill} stroke="#000" stroke-width=".014111px">
        <path d="m0.79375 288.53 3.4396 3.7042 3.4396-3.7042z" />
        <path d="m0 297v-8.4667l3.9688 4.2333v4.2333z" />
        <path d="m4.4979 292.77v4.2333h3.9688v-8.4667z" />
      </g>
    </svg>
  )
