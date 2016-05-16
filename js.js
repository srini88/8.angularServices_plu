(function(){

var app = angular.module('app',[]);

//dont have to inject provide service into config and then call provider 
/// provider is also exposed directly on module object..

//inside the booksProvider doing DI with constants..
app.provider('books', function(constants){
	this.$get = function(){
		var appName = constants.APP_TITLE;
		var appDesc = constants.APP_DESCRIPTION;
		var version = constants.APP_VERSION;

		if (includeVersionInTitle){
			appName += ' ' + version;
		}

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

//injecting the books provider, using booksProvider instead of books
///not working with just books
//controlling it with the setter...///control what needs to be returned..
//constants can be injected...value cannot..and others cannot except provider..
//trying to inject badgeService --- wont work - onyl constants can be injected into configs..
//Error: [$injector:unpr] Unknown provider: badgeService
//This error is not only for value... it is error for factory or service too..
///only inject provider or constant...
app.config(function(booksProvider, constants, badgeService) {
	booksProvider.setIncludeVersionInTitle(true);
	console.log("Title from constants service from config: " + constants.APP_TITLE);
})

})();