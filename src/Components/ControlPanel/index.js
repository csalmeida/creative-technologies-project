import React, { Component, Fragment } from 'react'
import Input from '../Input'
import Select from '../Select'
import { Container, Tabs, Tab } from './styles'

const tabs = [
  'Video Stream',
  'Pose Estimation',
  'Sound Mapping'
]

class ControlPanel extends Component {
  constructor(props) {
    super(props)

    this.state = {
      active: 0
    }
  }

  setActive = (key) => {
    this.setState({
      active: key
    })
  }

  renderVideoStreamFields = () => {
    return(<Container>
      <Input label="Camera" type="checkbox" checked={true} />
      <Input label="Video" type="checkbox" checked={true} />
      <Input label="Mirror" type="checkbox" checked={false} />
      <Input label="Fullscreen" type="checkbox" checked={false} />
      <Select label={"Facing Mode"} options={['User', 'Environment', 'Left', 'Right']} />
      <Input label="Framerate" placeholder="fps" />
    </Container>)
  }

  renderPoseEstimationFields = () => {
    return(<Container>
      <h1>Pose Estimation</h1>
      <Input label="Skeleton" type="checkbox" checked={true} />
      <Input label="Color" placeholder="#1b4c2a" />
      <Input label="Flip Horizontal" type="checkbox" checked={false} />
      <Select label={"Pose Detection"} options={['Single', 'Multiple']} />
      <Input label="Image Scale Factor" placeholder="number" />
      <Select label={"Output Stride"} options={[8, 16, 32]} />
    </Container>)
  }

  renderSoundMappingFields = () => {
    return(<Container>
      <h1>Sound Mapping</h1>
    </Container>)
  }

  renderFields = () => {
    switch (this.state.active) {
      case 0:
        return this.renderVideoStreamFields()
      
      case 1:
        return this.renderPoseEstimationFields()

      case 2:
        return this.renderSoundMappingFields()
    
      default:
        return (<Container>
          <h1>Control Panel</h1>
          <Input label="Color" placeholder="#1b4c2a" />
          <Input label="Camera" type="checkbox" checked={true} />
          <Input label="Multiplier" type="number" checked={true} />
          <Select label={"Output Stride"} options={[8, 16, 32]} />
          <Select label={"Pose Detection"} options={['Single', 'Multiple']} />
        </Container>)
    }
  }

  render = () => {
    return(
      <Fragment>
      <Tabs>
        {tabs.map((tab, index) => {
          return <Tab
          key={index} 
          active={index === this.state.active}
          onClick={() => this.setActive(index)}><h2>{tab}</h2></Tab>
        })}
      </Tabs>
      {this.renderFields()}
      </Fragment>
      
    )
  }
}

export default ControlPanel