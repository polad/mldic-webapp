define([
    "dojo/_base/declare",
    "dojo/store/Memory",
    "data/Entries.js"
], function(declare, Memory, EntriesData) {
    return declare([ Memory ], {
        data: EntriesData
    });
});