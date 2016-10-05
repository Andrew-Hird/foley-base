import React from 'react'
import aws from './aws'
import Center from 'react-center'
import record from './record'
import visualizer from './visualizer'

import Header from './Header'
import NewRec from './NewRec'
import Recordings from './Recordings'

export default React.createClass({
  getInitialState() {
    return {
      allAudio: [],
      isRec: false,
      isLoading: true
    }
  },

  componentDidMount() {
    this.getAudio()
  },

  getAudio() {
    aws.getAudio(this.renderAudio)

  },

  afterUpload() {
    this.setState({isLoading: true})
    setTimeout(this.getAudio, 3000)
  },

  delAudio(clipName) {
    this.setState({isLoading: true})
    aws.delAudio(clipName)
    .then(setTimeout(this.getAudio, 1000))
    .catch(function(err) {
      console.log(err)
    })
  },

  startRecord() {
    visualizer.redLine()
    record.startRecord()
    this.setState({isRec: true})
  },

  endRecord() {
    visualizer.blackLine()
    record.endRecord()
    .then(this.setState({isRec: false, isLoading: true}))
    .then(this.addAudio)
    .then(setTimeout(this.getAudio, 3000))
    .catch(function(err) {
      console.log(err)
    })
  },

  addAudio(clipInfo) {
    aws.addAudio(clipInfo)
  },

  renderAudio(err, allAudio) {
    this.setState({
      allAudio: allAudio,
      isLoading: false
    })
  },

  render() {
    return (
        <div id="main">
            <Header text="Foley Base"/>
            <div className="rec-con">
              <NewRec text="Click below to record" startRecord={this.startRecord} endRecord={this.endRecord} afterUpload={this.afterUpload} isRec={this.state.isRec}/>
            </div>
            <img className={this.state.isLoading ? 'isLoading' : 'notLoading'} src="https://popp.undp.org/Style%20Library/POPP/images/load.gif" />
            <hr />
            <div className="new-rec-con">
              <Recordings allAudio={this.state.allAudio} delAudio={this.delAudio}/>
            </div>
          </div>
    )
  }
})
