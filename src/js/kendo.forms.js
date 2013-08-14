(function($, kendo) {
  var ui = kendo.ui,
    Widget = ui.Widget,
    formWidget;

  var Form = Widget.extend({
    init: function(element, options) {
      // base call to widget initialization
      Widget.fn.init.call(this, element, options);
    },
    options: {
      // the name is what it will appear in the kendo namespace (kendo.ui.Form).
      // The jQuery plugin would be jQuery.fn.kendoForm.
      name: 'Form'
    }
  });

  ui.plugin(Form);
} (jQuery, kendo));