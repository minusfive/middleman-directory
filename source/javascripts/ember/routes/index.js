MD.IndexRoute = Em.Route.extend({
  afterModel: function() {
    this.transitionTo('category', this.store.find('category', 'extensions'));
  }
});
