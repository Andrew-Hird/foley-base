import React from 'react'

import RecList from './RecList'

export default React.createClass({
  render() {
    return (
      <div id="rec">
        {this.props.audio.map((audio, i) => {
          return <RecList
            key={i}
            audio={audio.Key}
            delAudio={this.props.delAudio}
            audioDetails={this.props.audioDetails} />
        })}
      </div>
    )
  }
})
