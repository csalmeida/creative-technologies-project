import React, { Component, Fragment } from 'react'
import PoseNet from './Components/PoseNet'
import ControlPanel from './Components/ControlPanel'
import { GlobalStyles } from './Styles'

class App extends Component {
  render() {
    return (
      <Fragment>
        <GlobalStyles />
        <ControlPanel />
      </Fragment>
    )
  }
}

export default App
