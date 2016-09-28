import React from 'react'

export default React.createClass({
  render() {
    return (
      <div>
      <p>
        <em>{this.props.text}</em>
      </p>
      </div>
    )
  }
})
