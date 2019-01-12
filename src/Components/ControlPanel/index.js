import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { VIDEOSTREAM, POSEESTIMATION } from '../../Store/Actions/types'

import Input from '../Input'
import Select from '../Select'
import { Container, Tabs, Tab } from './styles'

// Tabs titles to be iterated through.
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
    return(<Container key={this.state.active}>
      <Input label="Camera" type="checkbox" 
      checked={this.props.videoStream.camera} 
      actionType={VIDEOSTREAM.CAMERA_TOGGLE} />

      <Input label="Video" type="checkbox"
      checked={this.props.videoStream.video}
      actionType={VIDEOSTREAM.VIDEO_TOGGLE}  />

      <Input label="Mirror" type="checkbox"
      checked={this.props.videoStream.mirror}
      actionType={VIDEOSTREAM.MIRROR_TOGGLE} />

      <Input label="Fullscreen" type="checkbox"
      checked={this.props.videoStream.fullscreen}
      actionType={VIDEOSTREAM.FULLSCREEN_TOGGLE} />
      
      <Select key={this.state.active} label="Facing Mode" 
      options={['User', 'Environment', 'Left', 'Right']}
      value={this.props.videoStream.facingMode}
      actionType={VIDEOSTREAM.FACINGMODE_UPDATE}
      />

      <Input label="Framerate" placeholder="fps"
      value={this.props.videoStream.framerate}
      actionType={VIDEOSTREAM.FRAMERATE_UPDATE}/>
    </Container>)
  }

  renderPoseEstimationFields = () => {
    return(<Container key={this.state.active}>
      <h1>Pose Estimation</h1>
      <Input label="Skeleton" type="checkbox"
      checked={this.props.poseEstimation.output.skeleton}
      actionType={POSEESTIMATION.SKELETON_TOGGLE} />

      <Input label="Color" placeholder="#1b4c2a"
      value={this.props.poseEstimation.output.color}
      actionType={POSEESTIMATION.COLOR_UPDATE} />

      <Input label="Flip Horizontal" type="checkbox"
      checked={this.props.poseEstimation.flipHorizontal}
      actionType={POSEESTIMATION.FLIPHORIZONTAL_TOGGLE} />

      <Select key={this.state.active} label="Pose Detection" options={['Single', 'Multiple']} 
      value={this.props.poseEstimation.detectionType}
      actionType={POSEESTIMATION.DETECTIONTYPE_UPDATE} />

      <Input label="Image Scale Factor" placeholder="between 0.2 and 1.0"
      value={this.props.poseEstimation.imageScaleFactor}
      actionType={POSEESTIMATION.IMAGESCALEFACTOR_UPDATE} />

      <Select label="Output Stride" options={[8, 16, 32]} 
      value={this.props.poseEstimation.outputStride}
      actionType={POSEESTIMATION.OUTPUTSTRIDE_UPDATE}/>

      <Select label="Multiplier" options={[1.01, 1.0, 0.75, 0.50]} 
      value={this.props.poseEstimation.multiplier}
      actionType={POSEESTIMATION.MULTIPLIER_UPDATE}/>

      <Input label="Max Pose Detections"
      value={this.props.poseEstimation.maxPoseDetections}
      actionType={POSEESTIMATION.MAXPOSEDETECTIONS_UPDATE} />

      <Input label="Score Threshold" 
      value={this.props.poseEstimation.scoreThreshold}
      actionType={POSEESTIMATION.SCORETHRESHOLD_UPDATE} />

      <Input label="NMS Radius" placeholder="Surpression distance"
      value={this.props.poseEstimation.nmsRadius}
      actionType={POSEESTIMATION.NMSRADIUS_UPDATE} />
    </Container>)
  }

  renderSoundMappingFields = () => {
    return(<Container key={this.state.active}>
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

const mapStateToProps = (state) => ({
  videoStream: state.videoStream,
  poseEstimation: state.poseEstimation,
})

export default connect(mapStateToProps, null)(ControlPanel)