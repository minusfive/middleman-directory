MD.ExtensionsAllController = Em.ArrayController.extend({
  needs: ['application'],
  sortProperties: ['official', 'name'],

  filterText: Em.computed.readOnly('controllers.application.filterText'),

  filteredContent: function() {
    var model         = this.get('arrangedContent'),
        filterText    = this.getWithDefault('filterText', '');

    if (Em.isEmpty(filterText)) {return model;}

    return model.filter(function(item) {
      return (item.get('name').toLowerCase().indexOf(filterText) > -1) ||
      (item.get('description').toLowerCase().indexOf(filterText) > -1);
    });
  }.property('arrangedContent', 'filterText', '[]')
});
