define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/text!./templates/Entry.html"
], function(declare, _WidgetBase, _TemplatedMixin, WidgetTemplate) {
    return declare([ _WidgetBase, _TemplatedMixin ], {
        templateString: WidgetTemplate,
        
        _setDataAttr: function(data) {
            if (data.phrase) {
                this.set("phrase", data.phrase);
            }
            if (data.language) {
                this.set("language", data.language);
            }
            if (data.descriptions instanceof Array && data.descriptions.length) {
                this.set("description", data.descriptions[0]);
            }
            this._set("data", data);
        },
        
        _setPhraseAttr: function(phrase) {
            this.phraseNode.innerHTML = phrase;
            this._set("phrase", phrase);
        },
        
        _setLanguageAttr: function(language) {
            this.languageNode.innerHTML = language.name;
            this._set("language", language);
        },
        
        _setDescriptionAttr: function(description) {
            this.descriptionNode.innerHTML = description.text;
            this._set("description", description);
        }
    });
});