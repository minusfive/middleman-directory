//= require_tree ./lib
//= require_self
//= require ./router
//= require_tree ./adapters
//= require_tree ./mixins
//= require_tree ./templates
//= require_tree ./models
//= require_tree ./routes
//= require_tree ./controllers
//= require_tree ./views

window.MD = window.MiddlemanDirectory = Em.Application.create({
  LOG_TRANSITIONS: true
});
