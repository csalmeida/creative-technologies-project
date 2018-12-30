import React, { Component } from 'react'
import Input from '../Input'
import Select from '../Select'
import { Container } from './styles'

class ControlPanel extends Component {
  render = () => {
    return(
      <Container>
        <h1>Control Panel</h1>
        <Input label="Color" placeholder="#1b4c2a" />
        <Input label="Camera" type="checkbox" checked={true} />
        <Select options={[8, 16, 32]} />
      </Container>
    )
  }
}

export default ControlPanel