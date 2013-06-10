define([
    "dojo/_base/declare",
    "dojo/store/JsonRest"
], function(declare, JsonRest) {
    return declare([ JsonRest ], {
        target: "/entries"
    });
});