import styled, { css } from 'styled-components'
import { palette } from '../../Styles/colors'

const Container = styled.div`
  width: 100%;
  /* border: red 2px solid; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  
  canvas {
    background: ${palette.darktone};
    /* border: blueviolet 2px solid; */
    ${props => props.mirror && css`
      transform: scale(-1, 1) !important;
    `}
  }

  video {
    /* border: purple 2px solid; */
  }
`

export {
  Container
}
