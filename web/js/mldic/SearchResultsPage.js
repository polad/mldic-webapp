define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/when",
    "dijit/_WidgetBase",
    "dijit/_Container",
    "mldic/Entry"
], function(declare, lang, when, _WidgetBase, _Container, SearchResultItem) {
    return declare([ _WidgetBase, _Container ], {
        _setStoreAttr: function(store) {
            when(store.query(), lang.hitch(this, "renderResults"));
        },
        
        renderResults: function(/*dojo/store/util/QueryResults*/ results) {
            this.onClearResults();
            results.forEach(lang.hitch(this, function(item) {
                var widget = this._buildResultItem(item);
                var clearHandler = this.on("clearResults", lang.hitch(this, function() {
                    this.removeChild(widget);
                    widget.destroy();
                    clearHandler.remove();
                }));
                this.addChild(widget);
            }));
        },
        
        _buildResultItem: function(data) {
            return new SearchResultItem({ data: data });
        },
        
        onClearResults: function() {}
    });
});