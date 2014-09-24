MD.ApplicationRoute = Em.Route.extend({
  model: function() {
    return this.store.find('category');
  }
});
