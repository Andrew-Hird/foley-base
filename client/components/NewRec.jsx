import React from 'react'
import ReactS3Uploader from 'react-s3-uploader'

let fileInput = null

export default React.createClass({
  render() {
    return (
      <div id="newRec">
        <em>{this.props.text}</em>
        <br/>
        <div className="butt">
          <div className="round-button">
            <div className="round-button-circle">
              <a href="#" onClick={() => this.props.startRecord()} className="round-button">record</a>
            </div>
          </div>
          <div className="round-button">
            <div className="round-button-circle">
              <a href="#" onClick={() => this.props.endRecord()} className="round-button">stop</a>
            </div>
          </div>
        </div>
        <div>
          <h4>Upload a Sound:</h4>
          <ReactS3Uploader id="upload" signingUrl="/s3/sign" accept="audio/*" onProgress={this.onUploadProgress} onError={this.onUploadError} onFinish={this.props.afterUpload} uploadRequestHeaders={{
            'x-amz-acl': 'public-read'
          }} contentDisposition="auto"/>
        </div>

      </div>

    )
  }
})
