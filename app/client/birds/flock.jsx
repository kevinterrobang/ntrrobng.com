import React from 'react'

Flock = React.createClass({

  propTypes: {
    count: React.PropTypes.number.isRequired,
    destroy: React.PropTypes.func.isRequired
  },

  handleResize: function () {

    var sky = document.getElementById('sky')
    var width = sky.offsetWidth
    var height = sky.offsetHeight

    _.forEach(this._birds, (birdComponent) => {
      console.log('setting bird state')
      birdComponent.setState({
        skyWidth: width,
        skyHeight: height
      })
    })
  },

  componentDidMount: function () {
    window.addEventListener('resize', this.handleResize);
  },

  componentWillUnmount: function () {
    window.removeEventListener('resize', this.handleResize);
  },

  addBird: function (birdComponent) {
    if (!this._birds) {
      this._birds = []
    }

    this._birds.push(birdComponent)
  },

  goBack () {
    this.props.destroy()
  },

  render () {

    var component = this;

    var sky = document.getElementById('sky')
    var width = sky.offsetWidth
    var height = sky.offsetHeight

    var birds = []
    for (let i = 0; i < this.props.count; i++) {
      birds.push(<Bird ref={component.addBird} key={i} skyWidth={width} skyHeight={height} />)
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
      skyWidth: this.props.skyWidth,
      skyHeight: this.props.skyHeight,
      stepCount: 0,
      turnArc: 0,
      changeDirSteps: Math.floor(Math.random() * 15) + 6,
      color: '#fff'
    }
  },

  componentDidMount() {
    this.interval = setInterval(() => {this.move()}, 50)
  },

  componentWillUnmount() {
    clearInterval(this.interval)
  },

  move() {

    var color = this.state.color
    var turnArc = this.state.turnArc
    if (this.state.stepCount % this.state.changeDirSteps == 0) {
      if (turnArc == 0) {
        turnArc = (Math.random() - 0.5) * 0.174 // 0.174 is 10 degrees in radians
        color = '#0f0'
      }
      else {
        turnArc = 0
        color = '#fff'
      }
    }

    var newD = this.state.d + turnArc
    var newX = this.state.x + this.state.v * Math.cos(newD)
    var newY = this.state.y + this.state.v * Math.sin(newD)

    // make them wrap for now
    if (newX > this.state.skyWidth) {
      newX -= this.state.skyWidth
    }
    else if (newX < 0) {
      newX += this.state.skyWidth
    }

    if (newY > this.state.skyHeight) {
      newY -= this.state.skyHeight
    }
    else if (newY < 0) {
      newY += this.state.skyHeight
    }

    // alright, set the new state
    this.setState({
      x: newX, y: newY, d: newD, v: this.state.v,
      stepCount: ++this.state.stepCount,
      turnArc: turnArc,
      color: color
    })
  },

  render() {
    return (<div className="bird" style={{left: this.state.x, top: this.state.y, backgroundColor: this.state.color}}></div>)
  }

})