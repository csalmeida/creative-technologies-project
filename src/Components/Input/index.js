import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { alternate, updateValue } from '../../Store/Actions'

import { Container } from './styles'
import ToggleSwitch from '../ToggleSwitch'

class Input extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.value,
      checked: this.props.checked,
    }
  }

  handleChange = (event) => {
    if (this.props.type === "checkbox") {
      this.setState({checked: !this.state.checked })
      this.props.alternate(!this.state.checked, this.props.actionType)
      console.log("Toggle:", this.state.checked)
    } else {
      this.setState({value: event.target.value})
      this.props.updateValue(event.target.value, this.props.actionType)
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
  action: () => { console.log("No action assigned to this component.") },
  actionType: null
}

const mapDispatchToProps = (dispatch) => {
  return {
    alternate(toggle, type) {
      dispatch(alternate(toggle, type))
    },
    updateValue(value, type) {
      dispatch(updateValue(value, type))
    }
  }
}

export default connect(null, mapDispatchToProps)(Input)