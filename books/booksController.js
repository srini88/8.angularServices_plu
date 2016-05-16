(function (){

//console.log(angular.module('app')); //prints a big object
angular.module('app').
controller('BooksController', ['books', 'dataService', 'logger', 'badgeService' ,BooksController]);

function BooksController(books, dataService, logger, badgeService){

	var vm = this;
	vm.appName = books.appName;
	vm.appDesc = books.appDesc;


	dataService.getAllBooks()
		.then(getBooksSuccess, null, getBooksNotification)
		.catch(errorCallback)
		.finally(getAllBooksComplete);

	function getBooksSuccess(books){
		vm.allBooks = books;
	}

	function errorCallback(errorMsg){
		console.log("error msg from catch ", errorMsg);
	}
	function getBooksNotification(notification){
		console.log("Notification msgs: "+ notification);
	}
	function getAllBooksComplete(){
		console.log("getAllBooks has completed ");
	}

	dataService.getAllReaders()
	.then(function (response){
		vm.allReaders = response;
	}).catch(function (fail){
		console.log("failed miserably catch ");
	})


	vm.getBadge = badgeService.retrieveBadge; 
	logger.output("BooksController has been created.."); 
}

})();