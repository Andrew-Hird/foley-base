import React from 'react'

import RecFormRecord from './RecFormRecord'
import RecFormUpload from './RecFormUpload'

let fileInput = null

export default React.createClass({
  render() {
    return (
      <div id="newRec">
        <div className={this.props.isRec ? 'is-rec' : 'not-rec'}>
          <div className="led-box">
            <div className="led-red"></div>
            <em>recording</em>
          </div>
        </div>

        <div id="recButtons">
          <a href="#" className="buttRec" onClick={() => this.props.startRecord()}><img className="recButt" src="images/record.png"/></a>

          <a href="#" className="buttRec" onClick={() => this.props.endRecord()}><img className="recButt" src="images/stop.png"/></a>
        </div>

        <input id="upload" type='file' onChange={this.props.handleInput}/>

        {this.props.showRecForm ? <RecFormRecord submitRec={this.props.submitRec} /> : null}
        {this.props.showUploadForm ? <RecFormUpload submitUpload={this.props.submitUpload} /> : null}

      </div>
    )
  }
})
