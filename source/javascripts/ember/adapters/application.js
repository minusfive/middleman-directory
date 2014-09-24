MD.ApplicationAdapter = DS.ActiveModelAdapter.extend({
  namespace: 'api/1',

  buildURL: function(type, id, record) {
    return this._super(type, id, record) + '.json';
  }
});
