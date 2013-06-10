define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/text!./templates/Entry.html"
], function(declare, _WidgetBase, _TemplatedMixin, WidgetTemplate) {
    return declare([ _WidgetBase, _TemplatedMixin ], {
        templateString: WidgetTemplate,
        
        _setPhraseAttr: function(phrase) {
            this.phraseNode.innerHTML = phrase;
            this._set("phrase", phrase);
        },
        
        _setLanguageAttr: function(language) {
            this.languageNode.innerHTML = language.name;
            this._set("language", language);
        }
    });
});