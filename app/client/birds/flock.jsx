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
        <button id="back-to-bird-setup" className="btn btn-inverted" onClick={this.goBack}>
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
      v: this.props.v || Math.random() * 2 + 5,
      stepCount: 0,
      turnArc: 0,
      changeDirSteps: Math.floor(Math.random() * 15) + 6
    }
  },

  componentDidMount() {
    this.interval = setInterval(() => {this.move()}, 50)
  },

  componentWillUnmount() {
    clearInterval(this.interval)
  },

  move() {

    var turnArc = this.state.turnArc
    if (this.state.stepCount % this.state.changeDirSteps == 0) {
      if (turnArc == 0) {
        turnArc = (Math.random() - 0.5) * 0.174 // 0.174 is 10 degrees in radians
      }
      else {
        turnArc = 0
      }
    }

    var newD = this.state.d + turnArc
    var newX = this.state.x + this.state.v * Math.cos(newD)
    var newY = this.state.y + this.state.v * Math.sin(newD)

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
    this.setState({x: newX, y: newY, d: newD, v: this.state.v, stepCount: ++this.state.stepCount, turnArc: turnArc})
  },

  render() {
    return (<div className="bird" style={{left: this.state.x, top: this.state.y}}></div>)
  }

})