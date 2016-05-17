(function(){

var app = angular.module('app',['ngRoute']);

//dont have to inject provide service into config and then call provider 
/// provider is also exposed directly on module object..

//inside the booksProvider doing DI with constants..
app.provider('books', ['constants',function(constants){
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

}]);

//injecting the books provider, using booksProvider instead of books
///not working with just books
//controlling it with the setter...///control what needs to be returned..
//constants can be injected...value cannot..and others cannot except provider..
//trying to inject badgeService --- wont work - onyl constants can be injected into configs..
//Error: [$injector:unpr] Unknown provider: badgeService
//This error is not only for value... it is error for factory or service too..
///only inject provider or constant..
//angular creates underlying provider for our factory or service...
//to demostrate - in config - it will automatically add provider prefix..
//lets add dataService..
app.config(['booksProvider','$routeProvider',function(booksProvider, $routeProvider) {
	booksProvider.setIncludeVersionInTitle(true);
	
	$routeProvider
		.when('/',{
			//by giving /templates.books.html - it is going to root..abs path
			//the below is relative path
			templateUrl :'templates/books.html',
			controller : 'BooksController',
			controllerAs :'books'
		})
		.when('/addBook',{
			templateUrl :'templates/addBook.html',
			controller : 'AddBookController',
			controllerAs :'addBook'
		})
		.when('/EditBook/:bookID',{  //need to use routeParams service..
			templateUrl :'templates/editBook.html',
			controller : 'EditBookController',
			controllerAs :'bookEditor',	//controllerAs 
			resolve :{
				//this way when you click on the link, it wont go immediately, it will wait until the promise gets resolved..
				books : function(dataService){
					return dataService.getAllBooks();
				}
			}
		})
		//Prior to 1.3 you had to pass route Config object to Otherwise..
		.otherwise('/');



}])

})();