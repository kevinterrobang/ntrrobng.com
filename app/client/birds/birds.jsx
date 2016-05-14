import React from 'react'
import ReactDOM from 'react-dom'

Template.birds.onCreated(function () {
  var instance = this

  instance.settingUp = new ReactiveVar(true)
  instance.destroyBirds = function () {
    instance.settingUp.set(true)
    sky.className = "hidden"
  }
})

Template.birds.events({
  'submit form': function (e, t) {
    e.preventDefault()

    var count = 0
    var sky = document.getElementById('sky')

    try {
      count = parseInt(e.currentTarget.elements.birdCount.value)
    }
    catch(err) {}

    // reset the bird count input value
    e.currentTarget.elements.birdCount.value = ''

    if (count > 500 && !confirm('More than 500 dots can slow down your shit. Are you sure?')) {
      return
    }

    if (count > 0 && sky) {
      t.settingUp.set(false)
      sky.className = ""
      ReactDOM.render(<Flock count={count} destroy={t.destroyBirds} />, sky)
    }
    else {
      e.currentTarget.elements.birdCount.focus()
    }
  },

  'click a#home': function (e) {
    e.preventDefault()
    FlowRouter.go('home')
  }
})

Template.birds.helpers({
  setup: () => Template.instance().settingUp.get()
})