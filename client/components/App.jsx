import React from 'react'
import aws from './aws'

import Header from './Header'
import Recordings from './Recordings'
import Visualiser from './Visualiser'

export default React.createClass({
  getInitialState () {
    return {
      audio: []
    }
  },

  componentDidMount () {
    this.getAudio()
  },

  getAudio () {
    aws.getAudio(this.renderAudio)
  },

  renderAudio (err, audio) {
    console.log(audio)
    this.setState({ audio: audio })
  },

  render() {
    return (
      <div>
        <Header text="Foley Base" />
        <Visualiser text="visualiser goes here" />
        <Recordings audio={this.state.audio} />
      </div>
    )
  }
})
