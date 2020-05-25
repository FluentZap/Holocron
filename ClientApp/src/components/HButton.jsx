import React, { useState, useEffect } from "react"
import styled from "styled-components"

function HButton(props) {
  let { width, height, text, style } = props
  if (!width) width = "64px"
  if (!height) height = "64px"
  return (
    <Button style={style}>
      <div className={"container"} style={{ width: width, height: height }}>
        <div
          className={"button"}
          style={{
            width: `calc(${width} - 4px)`,
            height: `calc(${height} - 4px)`,
          }}
        >
          <h2>{text}</h2>
        </div>
      </div>
    </Button>
  )
}

export default HButton

const Button = styled.div`
  filter: drop-shadow(0px 0px 2px red);

  .container {
    background-color: #9f0918;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10;
    clip-path: polygon(20% 0%, 100% 0, 100% 80%, 80% 100%, 0 100%, 0% 20%);
    border-radius: 5;
  }

  .button {
    font-family: Engli-Besh, Times, serif;
    background-color: #790713;
    display: flex;
    justify-content: center;
    align-items: center;
    clip-path: polygon(20% 0%, 100% 0, 100% 80%, 80% 100%, 0 100%, 0% 20%);
    border-radius: 5;
  }
`
