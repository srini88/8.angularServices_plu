(function (){

//console.log(angular.module('app')); //prints a big object
angular.module('app').
controller('BooksController', ['books', 'dataService', 'logger', 'badgeService' ,BooksController]);

// Injecting our dataService factory to our BooksControlelr
function BooksController(books, dataService, logger, badgeService){

	var vm = this;
	//calling the service and getting the properties
	vm.appName = books.appName;
	vm.appDesc = books.appDesc;


	//our new version returns a promise..
	// then is available on all promise objects..
	///separate cb for handling notifications...
	dataService.getAllBooks()
		.then(getBooksSuccess, getBooksError, getBooksNotification);

	// value passed in this books will be the value passed in the resolve function on the deferred object which is booksArray
	function getBooksSuccess(books){
		vm.allBooks = books;
	}
	function getBooksError(reason){
		console.log(reason);
	}
	function getBooksNotification(notification){
		console.log("Notification msgs: "+ notification);
	}


	vm.allReaders = dataService.getAllReaders();
	//all Readers returns objs with reading minutes, use that and call the badgeservice 

	vm.getBadge = badgeService.retrieveBadge;  //not passing in minutes here,,because allReaders has all...retrievebadge is for one..so use it in the view..

	//calling output on the mother prototype..not the logger property..its mother..
	logger.output("BooksController has been created.."); 
}

})();