import styled, { css } from 'styled-components'
import { palette } from '../../Styles/colors'

export const Tabs = styled.nav`
display: flex;
flex-direction: row;
justify-content: flex-start;
align-items: center;
padding-top: 1rem;
background: ${palette.darktone};
`

export const Tab = styled.div`
  background: ${palette.midtone};
  padding: 0.5rem 0.8rem;
  cursor: pointer;
  border-radius: 0.5rem 0.5rem 0 0;
  
  h2 {
    color: ${palette.text};
    font-size: 1.2rem;
  }

  ${props => props.active &&
    css`
    background: ${palette.base};
    `
  }
`

export const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: space-between;
flex-wrap: wrap;
padding: 2rem 1rem;
`

