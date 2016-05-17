(function(){
	angular.module("app")
	//have to inject $routeParams
	//no nneed to inject dataService into the controlleer..since call to the dataService is happening in the resolve propery...
	.controller('EditBookController', ['$routeParams', 'books','$cookies','$cookieStore','dataService','$log','$location', EditBookController]);
	function EditBookController($routeParams, books, $cookies, $cookieStore, dataService, $log, $location){
		var vm= this;

		//before using filter, now actual book 
		dataService.getBookByID($routeParams.bookID)
			.then(getBookSuccess)
			.catch(getBookError);

		function getBookSuccess(book){
			console.log(book);
			vm.currentBook = book;
			$cookieStore.put('lastEdited', vm.currentBook);

		}
		function getBookError(reason){
			$log.error(reason);
		}

		vm.setAsFavorite = function(){ //this works without moving
			//console.log(vm.currentBook + "cur"); prints
			$cookies.favoriteBook = vm.currentBook.name;	
		}
		//console.log(vm.currentBook, "cur"); prints undefined move next line to getBookSuccess

	}
})();