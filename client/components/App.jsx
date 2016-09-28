import React from 'react'

import Header from './Header'
import Recordings from './Recordings'
import Visualiser from './Visualiser'

export default React.createClass({
  render() {
    return (
      <div>
        <Header text="Foley Base" />
        <Visualiser text="visualiser goes here" />
        <Recordings text="Recordings" />
      </div>
    )
  }
})
