require([
    "dojo/query",
    "mldic/Application"
], function(query, Application) {
    new Application().
        placeAt(query("body")[0]).
        startup();
});