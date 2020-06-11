(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['listing'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "      <p class=\"book-condition content-text\">Condition: "
    + alias4(((helper = (helper = lookupProperty(helpers,"bookCondition") || (depth0 != null ? lookupProperty(depth0,"bookCondition") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"bookCondition","hash":{},"data":data,"loc":{"start":{"line":10,"column":56},"end":{"line":10,"column":73}}}) : helper)))
    + "</p>\n      <p class=\"book-price content-text\">Price: $"
    + alias4(((helper = (helper = lookupProperty(helpers,"bookPrice") || (depth0 != null ? lookupProperty(depth0,"bookPrice") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"bookPrice","hash":{},"data":data,"loc":{"start":{"line":11,"column":49},"end":{"line":11,"column":62}}}) : helper)))
    + "</p>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"bookListing\">\n  <div class=\"listing-icon\">\n    <i class=\"fas fa-book\"></i>\n  </div>\n  <div class=\"listing-content\">\n    <div class=\"listing-text\">\n      <p class=\"book-title content-text\">Book Title: "
    + alias4(((helper = (helper = lookupProperty(helpers,"bookTitle") || (depth0 != null ? lookupProperty(depth0,"bookTitle") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"bookTitle","hash":{},"data":data,"loc":{"start":{"line":7,"column":53},"end":{"line":7,"column":66}}}) : helper)))
    + "</p>\n      <p class=\"book-class content-text\">Class: "
    + alias4(((helper = (helper = lookupProperty(helpers,"bookClass") || (depth0 != null ? lookupProperty(depth0,"bookClass") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"bookClass","hash":{},"data":data,"loc":{"start":{"line":8,"column":48},"end":{"line":8,"column":61}}}) : helper)))
    + "</p>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_listing") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":9,"column":6},"end":{"line":12,"column":13}}})) != null ? stack1 : "")
    + "      <p class=\"contact content-text\">Contact: "
    + alias4(((helper = (helper = lookupProperty(helpers,"contact") || (depth0 != null ? lookupProperty(depth0,"contact") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"contact","hash":{},"data":data,"loc":{"start":{"line":13,"column":47},"end":{"line":13,"column":58}}}) : helper)))
    + "</p>\n    </div>\n    <img class=\"book-img\" src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"url") || (depth0 != null ? lookupProperty(depth0,"url") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data,"loc":{"start":{"line":15,"column":31},"end":{"line":15,"column":38}}}) : helper)))
    + "\" />\n  </div>\n</div>\n";
},"useData":true});
})();