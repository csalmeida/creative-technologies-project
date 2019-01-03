import styled, { css, keyframes } from 'styled-components'
import { palette } from '../../Styles/colors'

// Keeps Switch width propotionate to Circle.
const circleWidth = 1;

const forwards = keyframes`
  from {
    left: 0;
    
  }
  to {
    left: ${(circleWidth * 2.5) - circleWidth + "rem"};
  }
`

const reverse = keyframes`
  from {
    left: ${(circleWidth * 2.5) - circleWidth + "rem"};
    
  }
  to {
    left: 0;
  }
`

const moveHorizontally = css`
  animation: ${props => props.toggled ? forwards : reverse } .3s forwards 1;
`

export const Switch = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${props => props.toggled ? "flex-end" : "flex-start"};
  position: relative;
  background: ${palette.darktone};
  width: ${(circleWidth * 2.5) + "rem"};
  padding: 0.2rem;
  border-radius: 1rem;
  cursor: pointer;
`

export const Circle = styled.div`
  position: relative;
  background: ${palette.highlight};
  width: ${circleWidth + "rem"};
  height: ${circleWidth + "rem"};
  border-radius:50%;
  animation: ${moveHorizontally};
`