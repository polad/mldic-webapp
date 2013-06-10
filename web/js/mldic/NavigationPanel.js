define([
    "dojo/_base/declare",
    "dojo/topic",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/text!./templates/NavigationPanel.html",
    // Modules not mapped to local variables
    "mldic/EntrySearchBox"
], function(declare, topic, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, WidgetTemplate) {
    return declare([ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin ], {
        templateString: WidgetTemplate,
        entryStore: null,
        
        _searchDictionary: function(phrase) {
            topic.publish("/search", phrase);
        },
        
        _setEntryStoreAttr: function(store) {
            this.searchBox.set("store", store);
            this._set("entryStore", store);
        }
    });
});