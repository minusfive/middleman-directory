MD.ModelMixin = Em.Mixin.create({
  name:                 DS.attr('string'),
  description:          DS.attr('string'),
  links:                DS.attr(),
  tags:                 DS.attr(),
  official:             DS.attr('boolean'),
  supportedApiVersions: DS.attr('string'),
  isOfficial:           Em.computed.bool('official'),
  normalizedLink:       Em.computed.or('links.github', 'links.site')
});
