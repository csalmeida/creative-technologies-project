import React, { Component } from "react"
import { Switch, Circle } from "./styles"

export default class ToogleSwitch extends Component {
  render = () => (
    <Switch toggled={this.props.toggled} onClick={this.props.handleChange}>
      <Circle />
    </Switch>
  )
}

ToogleSwitch.defaultProps = {
  toggled: false,
}
