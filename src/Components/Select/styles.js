import styled, { css } from 'styled-components'
import { palette } from '../../Styles/colors'

const iconSize = 0.5

export const Container = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
margin-bottom: 1rem;
max-height: ${2.2 - 0.5 + "rem"};

background: ${palette.midtone};
padding: 0.6rem 0.5rem;
border-radius: 0.4rem;

label {
  margin-right: 1rem;
}

select {
  display: none;
}
`

export const Options = styled.div`
background: ${palette.darktone};
padding: 0.5rem 0.5rem;
border-radius: 0.4rem;
cursor: pointer;
position: relative;

select {
  display: none;
}

${props => props.open && 
    css`
    align-self: flex-start;
    z-index: 10;
    `
}
`

export const Option = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  position: relative;

  font-size: 1.2rem;
  min-width: 5rem;
  text-align: center;
  padding-bottom: 0;
  margin-bottom: 0;
  border-bottom: none;

  :not(:last-of-type) {
    padding-bottom: 0.5rem;
    margin-bottom: 0.5rem;
    border-bottom: 2px solid ${palette.lighttone};
  }

${props => props.selected && 
    css`
    color: ${palette.highlight};
    transition: color .2s;
    `
  }

  svg {
    fill: ${palette.highlight};
    width:  ${iconSize * 1.8 + "rem"};
    height: ${iconSize * 1.8 + "rem"};
    cursor: pointer;
    margin-left: 0.5rem;

    ${ props => props.open ? (
        css`transform: rotate(0deg);`
      ) : (
        css`transform: rotate(180deg);`
      )}
  }
`

export const Triangle = styled.div`
  position: relative;
  background-color: ${palette.highlight};
  text-align: left;
  cursor: pointer;

  width:  ${iconSize + "rem"};
	height: ${iconSize + "rem"};
  ${ props => props.open ? (
      css`border-top-right-radius: 30%;`
    ) : (
      css`border-bottom-left-radius: 30%;`
    )}

  transform: rotate(-60deg) skewX(-30deg) scale(1,.866);

  :before, :after {
    content: '';
	  position: absolute;
	  background-color: inherit;

    width:  ${iconSize + "rem"};
	  height: ${iconSize + "rem"};
    ${props => props.open ? (
      css`border-top-right-radius: 30%;`
    ) : (
      css`border-bottom-left-radius: 30%;`
    )}
    
  }

  :before {
    transform: rotate(-135deg) skewX(-45deg) scale(1.414,.707) translate(0, ${props => props.open ? -50 + "%" : 50 + "%"});
  }

  :after {
    transform: rotate(135deg) skewY(-45deg) scale(.707,1.414) translate(${props => props.open ? 50 + "%" : -50 + "%"});
  }
`


