MD.Category = DS.Model.extend({
  name:           DS.attr('string'),
  tags:           DS.attr(),
  directoryItems: DS.hasMany('directoryItem')
});

// MD.Category = Em.Object.extend({
//   tags: function() {
//     var tags = Ember.A([]);

//     this.get('data').forEach(function(cat) {
//       tags.pushObjects(cat.get('tags'));
//     });

//     return tags.uniq();
//   }.property('data.@each.tags'),

//   itemsByTag: function(tagName) {
//     tagName = tagName.toLowerCase();
//     if (tagName === 'all') { return this.get('data'); }

//     return this.get('data').filter(function(item) {
//       return item.get('tags').filterProperty('name', tagName.capitalize()).length;
//     });
//   }
// });
