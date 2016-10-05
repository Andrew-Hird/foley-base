import React from 'react'
import ReactS3Uploader from 'react-s3-uploader'

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
          <a href="#" className="buttRec" onClick={() => this.props.startRecord()}><img className="recButt" src="http://www.clker.com/cliparts/d/b/c/f/13652249372108434179Record%20Button%20Microphone.svg.hi.png"/></a>

          <a href="#" className="buttRec" onClick={() => this.props.endRecord()}><img className="recButt" src="http://www.myiconfinder.com/uploads/iconsets/9b507c9c308162d28fbf621c59b363f4.png"/></a>
        </div>
        <input id="upload" type='file' onChange={this.props.handleInput} />
        </div>
    )
  }
})
