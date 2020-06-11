(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['entry'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"bookListing\">\n  <div class=\"listing-icon\">\n    <i class=\"fas fa-book\"></i>\n  </div>\n  <div class=\"listing-content\">\n    <div class=\"listing-text\">\n      <p class=\"book-title content-text\">Book Title: "
    + alias4(((helper = (helper = lookupProperty(helpers,"bookTitle") || (depth0 != null ? lookupProperty(depth0,"bookTitle") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"bookTitle","hash":{},"data":data,"loc":{"start":{"line":7,"column":53},"end":{"line":7,"column":66}}}) : helper)))
    + "</p>\n      <p class=\"book-class content-text\">Class: "
    + alias4(((helper = (helper = lookupProperty(helpers,"bookClass") || (depth0 != null ? lookupProperty(depth0,"bookClass") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"bookClass","hash":{},"data":data,"loc":{"start":{"line":8,"column":48},"end":{"line":8,"column":61}}}) : helper)))
    + "</p>\n      <p class=\"book-description content-text\">Class: "
    + alias4(((helper = (helper = lookupProperty(helpers,"bookDescription") || (depth0 != null ? lookupProperty(depth0,"bookDescription") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"bookDescription","hash":{},"data":data,"loc":{"start":{"line":9,"column":54},"end":{"line":9,"column":73}}}) : helper)))
    + "</p>\n      <!-- API CONTENT HERE -->\n    </div>\n  </div>\n</div>\n";
},"useData":true});
})();