MD.CategoryTagRoute = Ember.Route.extend({
  model: function(params) {
    return MD.Tag.tagForName(params.tag_name);
  },

  serialize: function(params) {
    return { tag_name: params.get('name').toLowerCase() };
  }
});
