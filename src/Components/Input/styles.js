import styled from 'styled-components'
import { palette } from '../../Styles/colors'

export const Container = styled.div`
background: ${palette.midtone};
padding: 0.4rem 0.5rem;

display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;

border-radius: 0.4rem;
margin-bottom: 1rem;

label {
  margin-right: 1rem;
}

input[type="text"] {
  background: ${palette.darktone};
  color: ${palette.text};
  font-size: 1.1rem;
  border: none;
  border-radius: 0.4rem;
  padding: 0.2rem 0.5rem;
}

input::placeholder {
  color: ${palette.text};
  opacity: .5; /* Firefox */
}

input[type="checkbox"] {
  display: none;
}
`
