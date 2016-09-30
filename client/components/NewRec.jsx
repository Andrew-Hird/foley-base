import React from 'react'

export default React.createClass({
  render() {
    return (
      <div>
        <em>{this.props.text}</em>
        <br/>

        <button onClick={() => this.props.startRecord()} style={{ backgroundColor: 'red'}} >record</button>
        <button onClick={() => this.props.endRecord()} style={{ backgroundColor: 'white'}}>stop</button>
      </div>
    )
  }
})
