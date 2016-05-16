(function(){

var app = angular.module('app',[]);

//dont have to inject provide service into config and then call provider 
/// provider is also exposed directly on module object..

app.provider('books', function(){
	this.$get = function(){
		var appName = "book logger";
		var appDesc = "track which books you read";
		var version = '1.0';
		return {
			appName :appName,
			appDesc : appDesc
		};
	};
	//to expose some config points..
	//setter is defined on this..
	///configure internal values that may controlled what is returned by the get function
	var includeVersionInTitle = false;
	this.setIncludeVersionInTitle = function(value){
		includeVersionInTitle = value;
	};

});



})();