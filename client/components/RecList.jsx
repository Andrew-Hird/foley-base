import React from 'react'

export default React.createClass({
  render() {
    return (
      <div>
        <h4>{this.props.audio}</h4>
        <audio controls="controls" src ={'https://s3-us-west-2.amazonaws.com/audio-foley-base/' + this.props.audio} type="audio/ogg"></audio>

      </div>
    )
  }
})