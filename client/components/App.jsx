import React from 'react'
import aws from './aws'
import record from './record'

import Header from './Header'
import Visualiser from './Visualiser'
import NewRec from './NewRec'
import Recordings from './Recordings'

export default React.createClass({
    getInitialState() {
        return {audio: []}
    },

    componentDidMount() {
        this.getAudio()
    },

    getAudio() {
        aws.getAudio(this.renderAudio)
    },

    startRecord() {
        record.startRecord()
    },

    endRecord() {
        record.endRecord()
        .then(this.addAudio) //write promise for aws.addAudio
        .then(this.getAudio)
        .catch(function (err) {
          console.log(err)
        })
    },

    addAudio(data) {
        aws.addAudio(data, this.getAudio)
    },

    renderAudio(err, audio) {
        this.setState({audio: audio})
    },

    render() {
        return (
            <div>
                <Header text="Foley Base" />
                <Visualiser text="visualiser goes here" />
                <NewRec text="Click below to record" startRecord={this.startRecord} endRecord={this.endRecord} />
                <Recordings audio={this.state.audio}  />
            </div>
        )
    }
})
