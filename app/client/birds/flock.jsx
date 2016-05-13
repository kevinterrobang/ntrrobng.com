import React from 'react'

Flock = React.createClass({

  propTypes: {
    count: React.PropTypes.number.isRequired,
    destroy: React.PropTypes.func.isRequired
  },

  goBack () {
    this.props.destroy()
  },

  getInitialState () {
    var birds = []
    for (let i = 0; i < this.props.count; i++) {
      birds.push(new Bird(Math.floor(Math.random() * 100),
                          Math.floor(Math.random() * 100),
                          Math.random() * Math.PI * 2,
                          Math.random() * 5))
    }

    return {birds: birds}
  },

  render () {

    var component = this;

    var sky = document.getElementById('sky')
    var width = sky.offsetWidth
    var height = sky.offsetHeight

    var birds = []
    for (let i = 0; i < this.props.count; i++) {
      birds.push(<Bird key={i} skyWidth={width} skyHeight={height} />)
    }

    return (
      <div>
        {birds}
        <button id="back-to-bird-setup" className="btn btn-primary" onClick={this.goBack}>
          Back to Choose
        </button>
      </div>
    )
  }
})

Bird = React.createClass({

  propTypes: {
    skyWidth: React.PropTypes.number.isRequired,
    skyHeight: React.PropTypes.number.isRequired,
    getNeighbors: React.PropTypes.func,
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    d: React.PropTypes.number,
    v: React.PropTypes.number
  },

  getInitialState() {
    return {
      x: this.props.x || Math.random() * this.props.skyWidth,
      y: this.props.y || Math.random() * this.props.skyHeight,
      d: this.props.d || Math.random() * Math.PI * 2,
      v: this.props.v || Math.random() * 10
    }
  },

  componentDidMount() {
    this.interval = setInterval(() => {this.move()}, 50)
  },

  componentWillUnmount() {
    clearInterval(this.interval)
  },

  move() {

    var newD = this.state.d
    if (Math.random() < 0.25) {
      newD = Math.random() * Math.PI * 2
    }

    var newV = this.state.v
    if (Math.random() < 0.25) {
      newV = Math.random() * 10
    }

    var newX = this.state.x + newV * Math.cos(newD)
    var newY = this.state.y + newV * Math.sin(newD)

    // make them wrap for now
    if (newX > this.props.skyWidth) {
      newX -= this.props.skyWidth
    }
    else if (newX < 0) {
      newX += this.props.skyWidth
    }

    if (newY > this.props.skyHeight) {
      newY -= this.props.skyHeight
    }
    else if (newY < 0) {
      newY += this.props.skyHeight
    }

    // alright, set the new state
    this.setState({x: newX, y: newY, d: newD, v: newV})
  },

  render() {
    return (<div className="bird" style={{left: this.state.x, top: this.state.y}}></div>)
  }

})