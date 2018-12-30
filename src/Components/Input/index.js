import React, { Component, Fragment } from 'react'
import { Container } from './styles'
import ToggleSwitch from '../ToggleSwitch'

export default class Input extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      checked: this.props.checked,
    }
  }

  handleChange = (event) => {
    if (this.props.type === "checkbox") {
      this.setState({checked: (this.state.checked ? false : true) })
      console.log("Toggle:", this.state.checked)
    } else {
      this.setState({value: event.target.value})
      console.log("Value:", this.state.value)
    }
  }

  render = () => (
    <Container>
      <label>{this.props.label}</label>
      { this.props.type === "checkbox" ? (
      <Fragment>
          <ToggleSwitch toggled={this.state.checked} handleChange={this.handleChange} />
          <input type={this.props.type} checked={this.state.checked} onChange={this.handleChange}/>
        </Fragment>) : (
          <input type={this.props.type} placeholder={this.props.placeholder} value={this.state.value} onChange={this.handleChange} />
        )}
    </Container>
  )
}

Input.defaultProps = {
  label: "Field Title",
  type: "text",
  value: "",
  placeholder: "",
  checked: false,
}