(function (){

//console.log(angular.module('app')); //prints a big object
angular.module('app').
controller('BooksController', ['books', 'dataService', 'logger', 'badgeService','$q' ,'$cookies','$cookieStore',BooksController]);

//update booksController and store that shit in the view..
function BooksController(books, dataService, logger, badgeService, $q, $cookies, $cookieStore){

	var vm = this;
	vm.appName = books.appName;
	vm.appDesc = books.appDesc;

	var booksPromise = dataService.getAllBooks();
	var readersPromise = dataService.getAllReaders();

	$q.all([booksPromise, readersPromise])
		.then(getAllDataSuccess)
		.catch(getAllDataError);

	function getAllDataSuccess(dataArray){
		vm.allBooks = dataArray[0];
		vm.allReaders = dataArray[1];
	}
	function getAllDataError(reason){
		console.log(reason);
	}
	vm.getBadge = badgeService.retrieveBadge; 
	logger.output("BooksController has been created.."); 
	///get thsese stuff from the view...
	vm.favoriteBook = $cookies.favoriteBook; //getting from within the function
	console.log($cookies.favoriteBook , "from cookie");
	vm.lastEdited = $cookieStore.get('lastEdited');
}

})();