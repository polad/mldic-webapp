define([
    "dojo/_base/declare",
    "dijit/form/ComboBox"
], function(declare, ComboBox) {
    return declare([ ComboBox ], {
        hasDownArrow: false,
        placeHolder: "search dictionary",
        searchAttr: "phrase"
    });
});