MD.DirectoryItem = DS.Model.extend({
  name:                 DS.attr('string'),
  description:          DS.attr('string'),
  links:                DS.attr(),
  tags:                 DS.attr(),
  official:             DS.attr('boolean'),
  supportedApiVersions: DS.attr(),

  category:             DS.belongsTo('category'),

  isOfficial:           Em.computed.readOnly('official'),
  normalizedLink:       Em.computed.or('links.github', 'links.site')
});

// MD.DirectoryItem = Ember.Object.extend({
//   tagsWithoutOfficial: function() {
//     return this.get('tags').rejectProperty('name', 'Official');
//   }.property('tags.@each'),

//   isOfficial: function() {
//     return this.get('tags').filterProperty('name', 'Official').length;
//   }.property('tags.@each'),

//   normalizedLink: function() {
//     return this.get('links.github') || this.get('links.site');
//   }.property('links.github', 'links.site')
// });
