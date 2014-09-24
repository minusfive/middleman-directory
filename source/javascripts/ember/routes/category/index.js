MD.CategoryIndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('category.tag', this.controllerFor('category').get('content'), MD.Tag.tagForName('all'));
  }
});
