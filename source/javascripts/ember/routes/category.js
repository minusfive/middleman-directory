MD.CategoryRoute = Em.Route.extend({
  defaultCategoryId: 'extensions',

  model: function(params) {
    var category_id = params.category_id || this.get('defaultCategoryId');
    return this.store.find('category', category_id);
  },

  afterModel: function() {
    Em.Logger.log('after');
  },

  serializer: function(model) {
    return {category_id: (Em.isEmpty(model) ? this.get('defaultCategoryId') : model.get('id'))};
  },

  resetController: function(controller) {
    controller.set('filteredItems', controller.get('directoryItems'));
  },

  actions: {
    didTransition: function() {
      Em.Logger.log('did');
    },

    willTransition: function() {
      Em.Logger.log('will');
      this.controllerFor('application').send('clearFilter');
    }
  }
});
