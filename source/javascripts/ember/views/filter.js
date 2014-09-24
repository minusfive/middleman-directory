MD.FilterView = Ember.View.extend({
  classNames: ['input-append'],
  template: Ember.Handlebars.compile('{{view Ember.TextField valueBinding="view.value" class="listjs-search" placeholder="Search to filter extensions..."}}<button {{action clickedButton target="view"}} id="listjs-search-remove" class="btn btn-middleman listjs-search-icon"><i {{bindAttr class=view.buttonClassNames}}></i></button>'),

  buttonClassNames: function() {
    var classes = Ember.A(['icon-white']);
    classes.pushObject(Ember.isEmpty(this.get('value')) ? 'icon-search' : 'icon-remove');
    return classes.join(" ");
  }.property('value'),

  clickedButton: function() {
    if (!Ember.isEmpty(this.get('value'))) {
      this.set('value', '');
    }
  }
});
