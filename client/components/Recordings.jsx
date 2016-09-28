import React from 'react'
import NewRec from './NewRec'
import RecList from './RecList'

export default React.createClass({
  render() {
    return (
      <div>
        <h2>{this.props.text}</h2>
        <NewRec text="make recording here" />
        <RecList text="recording list and players here" />
      </div>
    )
  }
})
