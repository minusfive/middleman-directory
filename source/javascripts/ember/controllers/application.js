MD.ApplicationController = Ember.ArrayController.extend({
  filterText: null,

  actions: {
    filter: function(filterText) {
      this.set('filterText', filterText);
    },

    clearFilter: function() {
      Em.Logger.log('clearFilter');
      this.set('filterText', null);
    }
  }
});
