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

  getBirds: function () {
    return this._birds
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
      birds.push(<Bird ref={component.addBird} key={i}
                       skyWidth={width}
                       skyHeight={height}
                       getBirds={this.getBirds} />)
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
    getBirds: React.PropTypes.func.isRequired,
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
      color: '#fff',
      leader: null
    }
  },

  componentDidMount() {
    this.interval = setInterval(() => {this.move()}, 50)
  },

  componentWillUnmount() {
    clearInterval(this.interval)
  },

  move() {

    var birds = this.props.getBirds()
    var color = this.state.color
    var turnArc = this.state.turnArc
    var leader = this.state.leader
    var newD = this.state.d
    var newV = this.state.v

    if (!leader) {
      _.forEach(birds, (bird) => {

        // if this bird is that bird or if that
        // bird is already following this bird, move along
        if (this == bird || bird.state.leader == this) {
          return true // don't compare with itself, true continues loop
        }

        if (Math.pow(bird.state.x - this.state.x, 2) + Math.pow(bird.state.y - this.state.y, 2) < 225) {

          var dx1 = Math.cos(newD),
              dy1 = Math.sin(newD),
              dx2 = Math.cos(bird.state.d),
              dy2 = Math.sin(bird.state.d)

          if (Math.abs(dx1 - dx2) < 0.2 && Math.abs(dy1 - dy2) < 0.2) {
            console.log('found a bird going in a similar direction!')
            leader = bird
            newD = bird.state.d
            newV = bird.state.v
            turnArc = 0
            //color = '#0ff'
          }

          return false // we found a close one, stop looping
        }
      })
    }
    else {
      newD = leader.state.d
    }

    if (!leader && this.state.stepCount % this.state.changeDirSteps == 0) {
      if (turnArc == 0) {
        turnArc = (Math.random() - 0.5) * 0.174 // 0.174 is 10 degrees in radians
      }
      else {
        turnArc = 0
      }
    }

    var newX = this.state.x + newV * Math.cos(newD)
    var newY = this.state.y + newV * Math.sin(newD)

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
      x: newX, y: newY, d: newD + turnArc, v: newV,
      stepCount: ++this.state.stepCount,
      turnArc: turnArc,
      color: color,
      leader: leader
    })
  },

  render() {
    return (
      <div className="bird"
           style={{left: this.state.x, top: this.state.y, backgroundColor: this.state.color}}>
      </div>
    )
  }

})