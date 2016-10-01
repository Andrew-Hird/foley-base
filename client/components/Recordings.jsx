import React from 'react'

import RecList from './RecList'

export default React.createClass({
  render() {
    return (
      <div id="rec">
        <h2>Recordings</h2>
        {this.props.audio.map((audio, i) => {
          return <RecList
            key={i}
            audio={audio.Key} />
        })}
      </div>
    )
  }
})
