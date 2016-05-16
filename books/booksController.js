(function (){

//console.log(angular.module('app')); //prints a big object
angular.module('app').
controller('BooksController', BooksController);

// Injecting our dataService factory to our BooksControlelr
function BooksController(books, dataService, logger, badgeService){

	var vm = this;
	//calling the service and getting the properties
	vm.appName = books.appName;
	vm.appDesc = books.appDesc;

	vm.allBooks = dataService.getAllBooks();
	vm.allReaders = dataService.getAllReaders();
	//all Readers returns objs with reading minutes, use that and call the badgeservice 

	vm.getBadge = badgeService;  //not passing in minutes here,,because allReaders has all...retrievebadge is for one..so use it in the view..

	//calling output on the mother prototype..not the logger property..its mother..
	console.log(vm.getBadge);  //workins now - prints badgeNigga
	logger.output("BooksController has been created.."); 
}

})();