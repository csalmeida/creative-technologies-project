import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { GlobalStyles } from './Styles'
import { Store } from './Store'

import PoseNet from './Components/PoseNet'
import ControlPanel from './Components/ControlPanel'

class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        <GlobalStyles />
        <PoseNet />
        <ControlPanel />
      </Provider>
    )
  }
}

export default App
