import React from 'react'

import RecList from './RecList'

export default React.createClass({
  render() {
    return (
      <div id="rec">
        {this.props.allAudio.map((allAudio, i) => {
          return <RecList
            key={i}
            fileName={allAudio.Key}
            author={allAudio.author}
            clipName={allAudio.clipName}
            clipDescription={allAudio.clipDescription}
            delAudio={this.props.delAudio}
            audioDetails={this.props.audioDetails} />
        })}
      </div>
    )
  }
})
