Template.home.onCreated(function () {
  this.showing = new ReactiveVar(false);
});

Template.home.helpers({
  show: () => Template.instance().showing.get()
});

Template.home.events({
  'click button': function (e, t) {
    FlowRouter.go('birds');
  }
});