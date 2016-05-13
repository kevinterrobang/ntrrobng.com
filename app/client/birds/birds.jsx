import React from 'react'
import ReactDOM from 'react-dom'

Template.birds.onCreated(function () {
  var instance = this

  instance.settingUp = new ReactiveVar(true)
  instance.destroyBirds = function () {


    instance.settingUp.set(true)
  }
})

Template.birds.events({
  'submit form': function (e, t) {
    e.preventDefault()
    t.settingUp.set(false)

    var count = 0
    var sky = document.getElementById('sky')

    try {
      count = parseInt(e.currentTarget.elements.birdCount.value)
    }
    catch(err) {}

    if (count > 0 && sky) {
      ReactDOM.render(<Flock count={count} destroy={t.destroyBirds} />, sky)
    }

    e.currentTarget.elements.birdCount.value = ''
  }
})

Template.birds.helpers({
  setup: () => Template.instance().settingUp.get()
})

FlockOfBirds = React.createClass({

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