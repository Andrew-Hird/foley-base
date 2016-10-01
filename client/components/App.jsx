import React from 'react'
import aws from './aws'
import Center from 'react-center'
import record from './record'

import Header from './Header'
import NewRec from './NewRec'
import Recordings from './Recordings'

export default React.createClass({
  getInitialState() {
    return {audio: []}
  },

  componentDidMount() {
    this.getAudio()
  },

  getAudio() {
    aws.getAudio(this.renderAudio)
  },

  afterUpload() {
    setTimeout(this.getAudio, 3000)
  },

  startRecord() {
    record.startRecord()
  },

  endRecord() {
    record.endRecord().then(this.addAudio).then(setTimeout(this.getAudio, 3000)).catch(function(err) {
      console.log(err)
    })
  },

  addAudio(clipInfo) {
    aws.addAudio(clipInfo)
  },

  renderAudio(err, audio) {
    this.setState({audio: audio})
  },

  render() {
    return (
      <Center>
        <div id="main">
          <Header text="Foley Base"/>
          <NewRec text="Click below to record" startRecord={this.startRecord} endRecord={this.endRecord} afterUpload={this.afterUpload}/>
          <Recordings audio={this.state.audio}/>
        </div>
      </Center>
    )
  }
})
