MD.CategoryController = Ember.ObjectController.extend({
  needs: ['categoryTag', 'application'],

  filterTag:      Em.computed.readOnly('controllers.categoryTag.filterTag'),
  filterText:     Em.computed.alias('controllers.application.filterText'),
  filteredItems:  Em.computed.reads('directoryItems'),

  sortedTags: function() {
    var tags = this.get('tags').reject(function(tag){
      return Em.isEqual(tag, 'official');
    }).sort();
    tags.unshift('official');
    return tags;
  }.property('tags.[]'),

  searchItems: function() {
    var items       = this.get('directoryItems'),
        filterText  = this.getWithDefault('filterText', '')

    if (!Em.isEmpty(filterText)) {
      items = items.filter(function(item) {
        return (item.get('name').toLowerCase().indexOf(filterText) > -1) ||
        (item.get('description').toLowerCase().indexOf(filterText) > -1);
      });
    }

    this.set('filteredItems', items);
  },

  filterTextOrItemsDidChange: function() {
    Em.run.debounce(this, 'searchItems', 150);
  }.observes('filterText')
});
