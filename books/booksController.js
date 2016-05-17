(function (){

//console.log(angular.module('app')); //prints a big object
angular.module('app').
controller('BooksController', ['books', 'dataService', 'logger', 'badgeService','$q' ,'$cookies','$cookieStore', '$log',BooksController]);

//update booksController and store that shit in the view..
function BooksController(books, dataService, logger, badgeService, $q, $cookies, $cookieStore, $log){

	var vm = this;
	vm.appName = books.appName;
	vm.appDesc = books.appDesc;

	dataService.getAllBooks()
		.then(getBooksSuccess)
		.catch(errorCallback);

	function getBooksSuccess(books){
		vm.allBooks = books;
	}
	function errorCallback(errorMsg){
		console.log("couldn't get from server " + errorMsg);
	}


	vm.getBadge = badgeService.retrieveBadge; 
	logger.output("BooksController has been created.."); 
	vm.favoriteBook = $cookies.favoriteBook; 
	vm.lastEdited = $cookieStore.get('lastEdited');

	$log.log("logging with log");
	$log.info("logging with info");
	$log.warn("logging with warn");
	$log.error("logging with error");
	$log.debug("logging with debug");  //all stuff shows in different colors..
}

})();