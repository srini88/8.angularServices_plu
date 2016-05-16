(function (){

//console.log(angular.module('app')); //prints a big object
angular.module('app').
controller('BooksController', BooksController);

// Injecting our dataService factory to our BooksControlelr
function BooksController(books, dataService){

	var vm = this;
	//calling the service and getting the properties
	vm.appName = books.appName;
	vm.appDesc = books.appDesc;

	vm.allBooks = dataService.getAllBooks();

}

})();