MD.CategoryRoute = Ember.Route.extend({
  model: function(params) {
    return ObjectifiedCategories.find(function(cat) {
      return cat.get('name').toLowerCase() === params.category_name;
    });
  },

  serialize: function(params) {
    return { category_name: params.name.toLowerCase() };
  }
});
