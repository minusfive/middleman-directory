MD.IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('category', ObjectifiedCategories.findProperty('name', 'Extensions'));
  }
});
