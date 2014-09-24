MD.Router.map(function() {
  this.route('category', {path: ':category_id'}, function() {
    this.route('tag', {path: ':tag'});
  });
});

MD.Router.reopen({
  location: 'auto'
});
