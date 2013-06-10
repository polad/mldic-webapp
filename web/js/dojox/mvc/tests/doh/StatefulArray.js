define([
	"doh",
	"dojo/Stateful",
	"dojox/mvc/StatefulArray"
], function(doh, Stateful, StatefulArray){
	doh.register("dojox.mvc.tests.doh.StatefulArray", [
		{
			name: "splice",
			runTest: function(){
				var dfd = new doh.Deferred(),
				 a = new StatefulArray([0, 1, 2, 3]);

				this.h = a.watchElements(function(idx, removals, adds){
					try{
						doh.is(1, idx, "The removal starts with index 1");
						doh.is([1, 2], removals, "Index 1 and index 2 should be removed");
						doh.is([100, 101], adds, "100 and 101 should be added");
					}catch(e){
						dfd.errback(e);
					}
				});

				a.splice(-3, 2, 100, 101);

				doh.is([0, 100, 101, 3], a, "The array should end up with 0, 100, 101, 3");
				dfd.callback(1);

				return dfd;
			},
			tearDown: function(){
				this.h && this.h.remove();
			}
		},
		function slice(){
			var a = new StatefulArray([0, 1, 2, 3]);
			doh.is([1, 2], a.slice(-3, 3), "Index 1 and index 2 should be returned");
			doh.is([1], a.slice(-3, -2), "Index 1 should be returned");
		},
		function concat(){
			var a = new StatefulArray([0, 1, 2, 3]);
			doh.is([0, 1, 2, 3], a.concat(), "concat() with empty args should end up with the same array");
			doh.is([0, 1, 2, 3, 4, 5, 6, 7, 8], a.concat([4, 5], [6, 7, 8]), "concat() should support multiple args");
			doh.is([0, 1, 2, 3, 4, 5, 6, 7, 8], a.concat(4, 5, [6, 7, 8]), "concat() should non-array values");
		},
		function isInstanceOf(){
			var a = new StatefulArray();
			doh.t(a.isInstanceOf(Stateful), "StatefulArray should be a subclass of Stateful");
			doh.t(a.isInstanceOf(StatefulArray), "StatefulArray's instance should work with isInstanceOf() call");
		}
	]);
});
