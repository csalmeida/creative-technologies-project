import React, { Component, Fragment } from 'react'
import { Container, Options, Option } from './styles'

// Use svg as fall back in case CSS icon breaks.
const svgTriangle = () => {return(
<Fragment>
  <svg version="1.1" x="0px" y="0px" width="79.39px" height="70.06px" viewBox="0 0 79.39 70.06">
  <defs>
  </defs>
  <g>
    <path d="M39.7,70.06H4.94c-3.8,0-6.17-4.11-4.27-7.4l17.38-30.1l17.38-30.1c1.9-3.29,6.65-3.29,8.55,0l17.38,30.1
      l17.38,30.1c1.9,3.29-0.47,7.4-4.27,7.4H39.7z"/>
  </g>
  </svg>
</Fragment>
)}

const renderOptions = (state, select) => {
  let {options, open, selected } = state
  if (open) {
    return options.map( (option, index) => <Option
    key={index}
    onClick={() => select(option)}
    selected={selected === option}
    >
      {console.log("Option:", option)}
      {option}
      </Option>
    )
  }
}

export default class Select extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: props.open,
      options: props.options,
      selected: props.options[0],
    }
  }

  open = () => {
    console.log('Open', this.state.open)
    this.setState({
      open: !this.state.open
    })
  }

  selectOption = (value) => {
    this.setState({
      selected: value,
    })
  }

  render = () => (
  <Container>
    <label>{this.props.label}</label>
    <Options onClick={() => this.open()} open={this.state.open}>
      <Option open={this.state.open}>
        {this.state.selected}
        {svgTriangle()}
      </Option>
      {renderOptions(this.state, this.selectOption)}
      <select>
      { this.state.options.map( (option, index) => <option key={index} value={option} defaultValue={this.state.selected === option}>
      {option}
      </option>
      )}
      </select>
    </Options>
  </Container>
  )
}

Select.defaultProps = {
  label: 'Options:',
  open: false,
  options: ["Empty"],
}