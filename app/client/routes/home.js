FlowRouter.route('/', {
  name: 'home',
  action() {
    BlazeLayout.render('homeLayout', {content: 'home'});
  }
});

FlowRouter.route('/birds', {
  name: 'birds',
  action() {
    BlazeLayout.render('homeLayout', {content: 'birds'});
  }
});