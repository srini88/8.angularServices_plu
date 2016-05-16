(function (){

//console.log(angular.module('app')); //prints a big object
angular.module('app').
controller('BooksController', ['books', 'dataService', 'logger', 'badgeService','$q' ,BooksController]);

function BooksController(books, dataService, logger, badgeService, $q){

	var vm = this;
	vm.appName = books.appName;
	vm.appDesc = books.appDesc;

	//wait for an array of promises to be resolved before taking action
	///

	var booksPromise = dataService.getAllBooks();
	var readersPromise = dataService.getAllReaders();

	// passing an array of promises..
	//then will be called if all of them are resolved..
	$q.all([booksPromise, readersPromise])
		.then(getAllDataSuccess)
		.catch(getAllDataError);

		/// dataArray will be indexed at the same position..as the order of the promises...
		//whatever value you give to timeout - it wont care-- it will take the one with hieghest timeout and data only be visible when all of them resolved...(if one gets rejected its gone)- shows error
		// as a result of this, the view will be will data at the same time..
	function getAllDataSuccess(dataArray){
		vm.allBooks = dataArray[0];
		vm.allReaders = dataArray[1];
	}
	function getAllDataError(reason){
		console.log(reason);
	}

	// dataService.getAllBooks()
	// 	.then(getBooksSuccess, null, getBooksNotification)
	// 	.catch(errorCallback)
	// 	.finally(getAllBooksComplete);

	// function getBooksSuccess(books){
	// 	vm.allBooks = books;
	// }

	// function errorCallback(errorMsg){
	// 	console.log("error msg from catch ", errorMsg);
	// }
	// function getBooksNotification(notification){
	// 	console.log("Notification msgs: "+ notification);
	// }
	// function getAllBooksComplete(){
	// 	console.log("getAllBooks has completed ");
	// }

	// dataService.getAllReaders()
	// .then(function (response){
	// 	vm.allReaders = response;
	// }).catch(function (fail){
	// 	console.log("failed miserably catch ");
	// })


	vm.getBadge = badgeService.retrieveBadge; 
	logger.output("BooksController has been created.."); 
}

})();