import React from 'react'

export default React.createClass({
  render() {
    return (
      <div>
        <input type="text" placeholder="Clip Name" />
        <input type="text" placeholder="Recordist" />
        <input type="text" placeholder="Description" />
        <br />
        <input
          type="button"
          value="Submit Sound"
          onClick={() => this.props.submit} />
      </div>
    )
  }
})
