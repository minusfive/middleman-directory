MD.ApplicationController = Ember.Controller.extend({
  categories: ObjectifiedCategories,
  filterText: null,

  filter: function(filterText) {
    this.set('filterText', filterText);
  }
});
