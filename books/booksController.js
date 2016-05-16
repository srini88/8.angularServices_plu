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

	//better way to handle the rejection of a promise..
	//service.returnsPromise()
	//in addition to then - promise also has catch ..
	// you pass to it a fn - as much the same way as the 2nd para as then ..
	// but advantage is when you have chaining...
	///then returns a promise...call the catch on its return value..
	/// cb provided to the catch , can handle rejections from intial promise return from service, as well as exceptions thrown in the succss handler passed to the then function...
	dataService.getAllBooks()
		.then(getBooksSuccess, null, getBooksNotification)
		.catch(errorCallback);

	// value passed in this books will be the value passed in the resolve function on the deferred object which is booksArray
	function getBooksSuccess(books){
		throw "error in success handler";  //you will see this in console in red color...need to handle it...
		vm.allBooks = books;
	}

	// function getBooksError(reason){
	// 	console.log(reason);
	// }
	//must robust way than to deal with error callback 2nd para
	function errorCallback(errorMsg){
		console.log("error msg from catch ", errorMsg);
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