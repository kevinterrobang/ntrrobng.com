FlowRouter.route('/', {
  name: 'home',
  action() {
    BlazeLayout.render('homeLayout', {content: 'home'});
  }
});