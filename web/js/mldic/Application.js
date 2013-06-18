define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/aspect",
    "dojo/topic",
    "dojo/when",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/text!./templates/Application.html",
    "mldic/HomePage",
    "mldic/SearchResultsPage",
    "mldic/store/Entry",
    "dojo/store/Memory",
    // Modules not mapped to local variables
    "dijit/layout/LayoutContainer",
    "dijit/layout/ContentPane",
    "dijit/layout/StackContainer",
    "mldic/NavigationPanel"
], function(declare, lang, aspect, topic, when, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, WidgetTemplate, HomePage, SearchResultsPage, EntryStore, SearchResutsStore) {
    return declare([ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin ], {
        "class": "Application",
        templateString: WidgetTemplate,
        
        postCreate: function() {
            this.inherited(arguments);
            this.addChild(this._buildHomePage());
            this.own(topic.subscribe("/search", lang.hitch(this, "_showSearchResults")));
            this.navigationPanel.set("entryStore", this.get("entryStore"));
        },
        
        _getEntryStoreAttr: function() {
            if (!this.entryStore) {
                this._setupEntryStore();
            }
            return this.entryStore;
        },
        
        _setupEntryStore: function(attributes) {
            this.entryStore = this._buildEntryStore(attributes);
            aspect.after(this.entryStore, "query", lang.hitch(this, function(result) {
                when(result, lang.hitch(this, "_loadSearchResults"));
                return result;
            }));
        },
        
        _buildHomePage: function(attributes) {
            return new HomePage(attributes);
        },
        
        _buildSearchResultsPage: function(attributes) {
            return new SearchResultsPage(attributes);
        },
        
        _buildEntryStore: function(attributes) {
            return new EntryStore(attributes);
        },
        
        _buildSearchResultsStore: function(attributes) {
            return new SearchResutsStore(attributes);
        },
        
		addChild: function(/*dijit/_WidgetBase*/ child, /*Integer?*/ insertIndex) {
            this.containerNode.addChild.apply(this.containerNode, arguments);
        },
        
        // _search: function(phrase) {
        //     when(this.get("entryStore").query({ phrase: new RegExp("^"+phrase) }), lang.hitch(this, "_showSearchResults"));
        // },
        
        _loadSearchResults: function(results) {
            var store = this._buildSearchResultsStore({ data: results });
            if (!this.searchResultsPage) {
                this._setupSearchResultsPage({ store: store });
            } else {
                this.searchResultsPage.set("store", store);
            }
        },
        
        _showSearchResults: function() {
            this.containerNode.selectChild(this.searchResultsPage, true);
        },
        
        _setupSearchResultsPage: function(attributes) {
            this.searchResultsPage = this._buildSearchResultsPage(attributes);
            this.containerNode.addChild(this.searchResultsPage);
        },
        
        _showEntry: function(entryId) {
        }
    });
});