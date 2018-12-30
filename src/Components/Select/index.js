import React, { Component, Fragment } from 'react'
import { Container, Option, Label } from './styles'

// Use svg as fall back in case CSS icon breaks.
const svgTriangle = (open) => {return(
<Fragment>
  <svg open={open} version="1.1" x="0px" y="0px" width="79.39px" height="70.06px" viewBox="0 0 79.39 70.06">
  <defs>
  </defs>
  <g>
    <path d="M39.7,70.06H4.94c-3.8,0-6.17-4.11-4.27-7.4l17.38-30.1l17.38-30.1c1.9-3.29,6.65-3.29,8.55,0l17.38,30.1
      l17.38,30.1c1.9,3.29-0.47,7.4-4.27,7.4H39.7z"/>
  </g>
  </svg>
</Fragment>
)}

export default class Select extends Component {
  constructor(props) {
    this.state = {
      open: props.open,
      options: props.options,
    }
  }

  render = () => (
  <Fragment>
    <Container open={this.props.open}>
    { this.props.options.map( (option, index) => <Option >
      option
      index === 1 && {svgTriangle(this.props.open)}
      </Option>
    )}
      <Option>8{svgTriangle(this.props.open)}</Option>
      <Option>16</Option>
      <Option>32</Option>
    </Container>
    <select>
      <option value="volvo">Volvo</option>
      <option value="saab">Saab</option>
      <option value="opel" >Opel</option>
      <option value="audi">Audi</option>
    </select>
  </Fragment>
  )
}

Select.defaultProps = {
  open: false,
  options: ["Empty"],
}