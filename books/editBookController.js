(function(){
	angular.module("app")
	//have to inject $routeParams
	//no nneed to inject dataService into the controlleer..since call to the dataService is happening in the resolve propery...
	.controller('EditBookController', ['$routeParams', 'books', EditBookController]);
	function EditBookController($routeParams, books){
		var vm= this;
		// better to use .then on books as books return a promise
		//return dataService.getAllBooks(); ..im not use .then
		vm.currentBook = books.filter(function(item){
			return item.book_id == $routeParams.bookID;
		})[0];
		console.log(vm.currentBook);
	}
})();