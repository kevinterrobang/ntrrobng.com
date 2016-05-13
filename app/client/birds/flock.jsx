import React from 'react'

Flock = React.createClass({

  propTypes: {
    count: React.PropTypes.number,
    destroy: React.PropTypes.func
  },

  goBack () {
    this.props.destroy()
  },

  render () {

    return (
      <div>
        <p>Creating a flock of {this.props.count} birds</p>
        <button id="back-to-bird-setup" className="btn btn-primary" onClick={this.goBack}>
          Back to Choose
        </button>
      </div>
    )
  }
})