MD.Category = Ember.Object.extend({
  tags: function() {
    var tags = Ember.A([]);

    this.get('data').forEach(function(cat) {
      tags.pushObjects(cat.get('tags'));
    });

    return tags.uniq();
  }.property('data.@each.tags'),

  itemsByTag: function(tagName) {
    tagName = tagName.toLowerCase();
    if (tagName === 'all') { return this.get('data'); }

    return this.get('data').filter(function(item) {
      return item.get('tags').filterProperty('name', tagName.capitalize()).length;
    });
  }
});

MD.DirectoryItem = Ember.Object.extend({
  tagsWithoutOfficial: function() {
    return this.get('tags').rejectProperty('name', 'Official');
  }.property('tags.@each'),

  isOfficial: function() {
    return this.get('tags').filterProperty('name', 'Official').length;
  }.property('tags.@each'),

  normalizedLink: function() {
    return this.get('links.github') || this.get('links.site');
  }.property('links.github', 'links.site')
});

MD.Tag = Ember.Object.extend({});
MD.Tag.allTags = Ember.Map.create({});
MD.Tag.tagForName = function(tagName) {
  if (!MD.Tag.allTags.has(tagName)) {
    MD.Tag.allTags.set(tagName, MD.Tag.create({ name: tagName.capitalize() }));
  }
  return MD.Tag.allTags.get(tagName);
};

var ObjectifiedCategories = CATEGORIES.map(function(cat) {
  cat.data = cat.data.map(function(item) {
    item.tags = Ember.A(item.tags).map(function(tag) {
      return MD.Tag.tagForName(tag);
    });
    return MD.DirectoryItem.create(item);
  });
  return MD.Category.create(cat);
});
