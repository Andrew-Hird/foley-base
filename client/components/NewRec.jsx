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
          <a href="#" className="buttRec" onClick={() => this.props.startRecord()}><img className="recButt" src="http://lh5.ggpht.com/K_rviF0f2z4UHwWmm8G92UWT5Hw-RxXA2fCGP87MUPg95HNRcPQTEhwinuBcYqFObtTj=w300"/></a>

          <a href="#" className="buttRec" onClick={() => this.props.endRecord()}><img className="recButt" src="https://cdn0.iconfinder.com/data/icons/command-buttons/512/Stop-512.png"/></a>
        </div>

        <div id="upload">
          <ReactS3Uploader
          id="upload"
          signingUrl="/s3/sign"
          accept="audio/*"
          onProgress={this.onUploadProgress}
          onError={this.onUploadError}
          onFinish={this.props.afterUpload}
          uploadRequestHeaders={{
            'x-amz-acl': 'public-read'
          }}
          contentDisposition="auto"/>
        </div>
      </div>
    )
  }
})
