MD.CategoryController = Ember.ObjectController.extend({
  sortedTags: function() {
    var sortedTags = Ember.copy(this.get('tags'));

    sortedTags.sort(function(item1, item2) {
      if (item1.get('name') === 'Official') { return -1; }
      if (item2.get('name') === 'Official') { return 1; }
      return item1.get('name').localeCompare(item2.get('name'));
    });

    sortedTags.unshiftObject(MD.Tag.tagForName('all'));

    return sortedTags;
  }.property('tags.@each')
});
