import React from 'react'

export default React.createClass({
    render() {
        return (
            <div>
                <em>{this.props.text}</em>
                <br/>

                <button onClick={() => this.props.startRecord()}>record</button>
                <button onClick={() => this.props.endRecord()}>stop</button>
            </div>
        )
    }
})
