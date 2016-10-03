import React from 'react'

export default React.createClass({
  render() {
    return (
      <div id="recList">
        <h4>{this.props.audio}</h4>
        <audio controls="controls" src ={'https://s3-us-west-2.amazonaws.com/audio-foley-base/' + this.props.audio} type="audio/ogg"></audio>
        <br/>
        <a href={'https://s3-us-west-2.amazonaws.com/audio-foley-base/' + this.props.audio}>
          <button>download</button>
        </a>
        <button onClick={() => this.props.delAudio(this.props.audio)}>delete</button>
        <hr/>
        {this.props.audioDetails(this.props.audio)}
      </div>
    )
  }
})
