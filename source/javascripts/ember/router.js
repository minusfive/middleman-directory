MD.Router.map(function() {
  this.route('category', { path: '/:category_name' }, function() {
    this.route('tag', { path: '/:tag_name' });
  });
});

MD.Router.reopen({
  location: 'auto'
});
