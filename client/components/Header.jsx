import React from 'react'

export default React.createClass({
  render() {
    return (
      <div id="header">
        <h1>{this.props.text}</h1>
        <br/>
        <em>Record your own sound or upload a file</em>
      </div>
    )
  }
})
