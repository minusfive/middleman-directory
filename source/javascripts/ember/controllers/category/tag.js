MD.CategoryTagController = Em.ObjectController.extend({
  // needs: ['application', 'category'],

  // items: function() {
  //   var categoryController = this.get('controllers.category');
  //   var allItems = categoryController.get('content').itemsByTag(this.get('name'));

  //   var filterText = (this.get('controllers.application.filterText') || '').toLowerCase();
  //   if (!Ember.isEmpty(filterText)) {
  //     allItems = allItems.filter(function(item) {
  //       return (
  //         (item.get('name').toLowerCase().indexOf(filterText) > -1) ||
  //         (item.get('description').toLowerCase().indexOf(filterText) > -1)
  //       );
  //     });
  //   }

  //   return allItems;
  // }.property('controllers.category.name', 'name', 'data.@each', 'controllers.application.filterText'),

  // sortedItems: function() {
  //   var items = Ember.copy(this.get('items'));
  //   items.sort(function(item1, item2) {
  //     if (item1.get('isOfficial')) { return -1; }
  //     if (item2.get('isOfficial')) { return 1; }

  //     return item1.get('name').localeCompare(item2.get('name'));
  //   });
  //   return items;
  // }.property('name', 'items.@each.isOfficial', 'items.@each.name')
});
