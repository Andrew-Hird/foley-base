import React from 'react'

import RecFormRecord from './RecFormRecord'
import RecFormUpload from './RecFormUpload'

let fileInput = null

export default React.createClass({
  onClick: function() {
    console.log('file entered')
    this.setState({showForm: true});
  },
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

        <input id="upload" type='file' onChange={this.props.handleInput}/>

        {this.props.showRecForm ? <RecFormRecord submitRec={this.props.submitRec} /> : null}
        {this.props.showUploadForm ? <RecFormUpload submitUpload={this.props.submitUpload} /> : null}

      </div>
    )
  }
})
