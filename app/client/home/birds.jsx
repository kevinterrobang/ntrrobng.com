Template.birds.onCreated(function () {
  var instance = this;

  instance.settingUp = new ReactiveVar(true);
  instance.destroyBirds = function () {
    t.settingUp.set(true);
  };
});

Template.birds.events({
  'submit form': function (e, t) {
    e.preventDefault();
    t.settingUp.set(false);
    // ReactDOM.render(<FlockOfBirds count={e.currentTarget.elements.birdCount.value}
    //                               destroy={t.destroyBirds} />);
  }
});

Template.birds.helpers({
  setup: () => Template.instance().settingUp.get()
});

// FlockOfBirds = React.createClass({

//   propTypes: {
//     count: React.PropTypes.integer,
//     destroy: React.PropTypes.func
//   },

//   goBack () {
//     this.props.destroy();
//   },

//   render () {

//     return (
//       <div>
//         <p>Creating a flock of {this.props.count} birds</p>
//         <button id="back-to-bird-setup" className="btn btn-primary" onClick={this.goBack}>
//           Back to Choose
//         </button>
//       </div>
//     );
//   }
// });