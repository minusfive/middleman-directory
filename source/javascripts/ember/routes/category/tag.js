MD.CategoryTagRoute = Em.Route.extend({
  model: function(params) {
    return {filterTag: params.tag};
  }

  // setupController: function(controller, model) {
  //   this._super(controller, model);
  //   // controller.set('filterText', null);
  // }
});
