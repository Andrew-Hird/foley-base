import React from 'react'

import RecFormRecord from './RecFormRecord'
import RecFormUpload from './RecFormUpload'

let fileInput = null

export default React.createClass({
  render() {
    return (
      <div id="newRec">

        <div className="all-buttons">
          <div className={this.props.isRec ? 'is-rec' : 'not-rec'}>
            <div className="led-box">
              <div className="led-red"></div>
              <em>recording</em>
            </div>
          </div>

            <div className={this.props.isRec ? 'not-rec' : 'is-rec'}>
              <a href="#" onClick={() => this.props.startRecord()}><img className="recButt" src="images/record.png"/></a>
            </div>

            <div className={this.props.isRec ? 'is-rec' : 'not-rec'}>
              <a href="#" onClick={() => this.props.endRecord()}><img className="recButt" src="images/stop.png"/></a>
            </div>
        </div>

        <input id="upload" type='file' onChange={this.props.handleInput}/>

        {this.props.showRecForm ? <RecFormRecord submitRec={this.props.submitRec}
        audioBlob={this.props.audioBlob} /> : null}
        {this.props.showUploadForm ? <RecFormUpload submitUpload={this.props.submitUpload} /> : null}

      </div>
    )
  }
})
