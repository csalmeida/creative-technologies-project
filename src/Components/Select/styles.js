import styled, { css } from 'styled-components'
import { palette } from '../../Styles/colors'

const iconSize = 0.5

export const Container = styled.div`
background: ${palette.darktone};
padding: 0.6rem 0.5rem;
border-radius: 0.4rem;
cursor: pointer;

select {
  display: none;
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
export const Option = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
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
    position: absolute;
    right: 0px;
    fill: ${palette.highlight};
    width:  ${iconSize * 1.8 + "rem"};
    height: ${iconSize * 1.8 + "rem"};
    cursor: pointer;

    ${ props => props.open ? (
        css`transform: rotate(0deg);`
      ) : (
        css`transform: rotate(180deg);`
      )}
  }
`

export const Label = styled.div`
  font-size: 1.2rem;
  min-width: 5rem;
  text-align: center;
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;

  border-bottom: 2px solid ${palette.lighttone};

  :not(:last-of-type) {
    border-bottom: none;
  }
`
