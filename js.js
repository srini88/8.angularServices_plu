(function(){

var app = angular.module('app',[]);
//config and provide service...provide is built in --service...injector knows this shit..
app.config(function($provide){
	///calling the provider fn on provide..
	///books is the name of the service...
	///2nd para - fn that defines the provider...
	////must have $get...
	///dollar get - very imp and just this
	$provide.provider('books', function(){
		this.$get = function(){
			var appName = "book logger";
			var appDesc = "track which books you read";
			return {
				appName :appName,
				appDesc : appDesc
			};

		};

	})
})



})();