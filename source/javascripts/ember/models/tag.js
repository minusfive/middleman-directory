// MD.Tag = Ember.Object.extend({});
// MD.Tag.allTags = Ember.Map.create({});
// MD.Tag.tagForName = function(tagName) {
//   if (!MD.Tag.allTags.has(tagName)) {
//     MD.Tag.allTags.set(tagName, MD.Tag.create({ name: tagName.capitalize() }));
//   }
//   return MD.Tag.allTags.get(tagName);
// };

// var ObjectifiedCategories = CATEGORIES.map(function(cat) {
//   cat.data = cat.data.map(function(item) {
//     item.tags = Ember.A(item.tags).map(function(tag) {
//       return MD.Tag.tagForName(tag);
//     });
//     return MD.DirectoryItem.create(item);
//   });
//   return MD.Category.create(cat);
// });
