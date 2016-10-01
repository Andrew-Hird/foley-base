import React from 'react'
import ReactS3Uploader from 'react-s3-uploader'

let fileInput = null

export default React.createClass({
  render() {
    return (
      <div>
        <div>
          <em>{this.props.text}</em>
          <br/>
          <button onClick={() => this.props.startRecord()} style={{
            backgroundColor: 'red'
          }}>record</button>
          <button onClick={() => this.props.endRecord()} style={{
            backgroundColor: 'white'
          }}>stop</button>
        </div>

        <ReactS3Uploader
      signingUrl="/s3/sign"
      accept="audio/*"
      onProgress={this.onUploadProgress}
      onError={this.onUploadError}
      onFinish={this.props.afterUpload}
      uploadRequestHeaders={{ 'x-amz-acl': 'public-read' }}
      contentDisposition="auto" />
      </div>

    )
  }
})
