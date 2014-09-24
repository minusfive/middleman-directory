MD.SortTagsMixin = Em.Mixin.create({
  allTags:    Em.computed.flattenArray('model', 'tags'),
  uniqueTags: Em.computed.uniq('allTags'),
  sortedTags: function() {
    var tags = this.get('uniqueTags').reject(function(tag){
      return Em.isEqual(tag, 'official');
    }).sort();
    tags.unshift('official');
    return tags;
  }.property('uniqueTags.[]')
});
