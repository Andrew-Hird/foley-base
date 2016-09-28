import React from 'react'

import NewRec from './NewRec'
import RecList from './RecList'

export default React.createClass({
  render() {
    return (
      <div>
        <h2>Recordings</h2>
        <NewRec text="make recording here" />

        {this.props.audio.map((audio, i) => {
          return <RecList
            key={i}
            audio={audio.Key} />
        })}
      </div>
    )
  }
})
