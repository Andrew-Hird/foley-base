import React from 'react'
import ReactS3Uploader from 'react-s3-uploader'

let fileInput = null

export default React.createClass({
  render() {
    return (
      <div id="newRec">
        <div className="butt">
          <div className="round-button">
            <div className="round-button-circle">
              <a href="#" onClick={() => this.props.startRecord()} className="round-button">record</a>
            </div>
          </div>
          <div className={this.props.isRec ? 'is-rec' : 'not-rec'}>
            <div className="led-box">
              <div className="led-red"></div>
              <em>recording</em>
            </div>
          </div>
          <div className="round-button">
            <div className="round-button-circle">
              <a href="#" onClick={() => this.props.endRecord()} className="round-button">stop</a>
            </div>
          </div>
        </div>
        <div id="upload">
          <ReactS3Uploader id="upload" signingUrl="/s3/sign" accept="audio/*" onProgress={this.onUploadProgress} onError={this.onUploadError} onFinish={this.props.afterUpload} uploadRequestHeaders={{
            'x-amz-acl': 'public-read'
          }} contentDisposition="auto"/>
        </div>
      </div>
    )
  }
})
