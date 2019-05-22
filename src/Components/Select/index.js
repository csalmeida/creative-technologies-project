import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import { updateValue } from "../../Store/Actions"
import { capitalize } from "../../Functions/text"

import { Container, Options, Option } from "./styles"

// Use svg as fall back in case CSS icon breaks.
const svgTriangle = () => {
  return (
    <Fragment>
      <svg
        version="1.1"
        x="0px"
        y="0px"
        width="79.39px"
        height="70.06px"
        viewBox="0 0 79.39 70.06"
      >
        <defs />
        <g>
          <path
            d="M39.7,70.06H4.94c-3.8,0-6.17-4.11-4.27-7.4l17.38-30.1l17.38-30.1c1.9-3.29,6.65-3.29,8.55,0l17.38,30.1
      l17.38,30.1c1.9,3.29-0.47,7.4-4.27,7.4H39.7z"
          />
        </g>
      </svg>
    </Fragment>
  )
}

class Select extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
  }

  open = () => {
    console.log("Open", this.state.open)
    this.setState({
      open: !this.state.open,
    })
  }

  selectOption = value => {
    const formattedValue =
      typeof value === "number" ? value : value.toLowerCase()
    this.props.updateValue(formattedValue, this.props.actionType)
  }

  render = () => (
    <Container>
      <label>{this.props.label}</label>
      <Options onClick={() => this.open()} open={this.state.open}>
        <Option open={this.state.open}>
          {typeof this.props.value === "number"
            ? this.props.value
            : capitalize(this.props.value)}
          {svgTriangle()}
        </Option>

        {this.state.open
          ? this.props.options.map((option, index) => (
              <Option
                key={index}
                onClick={() => this.selectOption(option)}
                selected={this.props.value === option}
              >
                {console.log("Option:", option)}
                {option}
              </Option>
            ))
          : null}

        <select>
          {this.props.options.map((option, index) => (
            <option
              key={index}
              value={option}
              defaultValue={this.props.value === option}
            >
              {option}
            </option>
          ))}
        </select>
      </Options>
    </Container>
  )
}

Select.defaultProps = {
  label: "Options:",
  open: false,
  options: ["Empty"],
  actionType: null,
}

const mapDispatchToProps = dispatch => {
  return {
    updateValue(value, type) {
      dispatch(updateValue(value, type))
    },
  }
}

export default connect(
  null,
  mapDispatchToProps,
)(Select)
