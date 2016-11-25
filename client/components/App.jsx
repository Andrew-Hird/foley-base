import React from 'react'
import aws from '../aws'
import record from '../record'
import visualizer from '../visualizer'

import Header from './Header'
import NewRec from './NewRec'
import Recordings from './Recordings'

let audio = null
let upload = null

export default React.createClass({
  getInitialState() {
    return {
      allAudio: [],
      isRec: false,
      isLoading: true,
      showRecForm: false,
      showUploadForm: false
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
    .then(this.setState({isRec: false, showRecForm: true}))
    .then(this.setBlob)
    .catch(function(err) {
      console.log(err)
    })
  },

  handleInput(e) {
    upload = e.currentTarget.files[0]
    this.setState({showUploadForm: true})
  },

  setBlob(blob) {
    audio = blob
  },

  addAudio(audio, clipName, recordist, description) {
    aws.addAudio(audio, clipName, recordist, description)
  },

  submitRec (clipName, recordist, description) {
    this.setState({showRecForm: false, isLoading: true})
    this.addAudio(audio, clipName, recordist, description)
    setTimeout(this.getAudio, 3000)
  },

  submitUpload (clipName, recordist, description) {
    this.setState({showUploadForm: false, isLoading: true})
    aws.addFile(upload, clipName, recordist, description)
    setTimeout(this.getAudio, 3000)
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
              <NewRec text="Click below to record"
                startRecord={this.startRecord}
                endRecord={this.endRecord}
                afterUpload={this.afterUpload}
                isRec={this.state.isRec}
                handleInput={this.handleInput}
                submitRec={this.submitRec}
                submitUpload={this.submitUpload}
                showRecForm={this.state.showRecForm}
                showUploadForm={this.state.showUploadForm} />
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
