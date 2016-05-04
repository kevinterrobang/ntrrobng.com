import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.temporaryTemplate.onCreated(function () {
  this.showing = new ReactiveVar(false);
});

Template.temporaryTemplate.helpers({
  show: () => Template.instance().showing.get()
});

Template.temporaryTemplate.events({
  'click button': function (e, t) {
    t.showing.set(!t.showing.get());
  }
});