(function(){
	angular.module("app")
	//have to inject $routeParams
	.controller('EditBookController', ['$routeParams', 'dataService', EditBookController]);
	function EditBookController($routeParams, dataService){
		var vm= this;

		dataService.getAllBooks()
		.then(function(books){
			//console.log(books);
			//one object that matches the desc will be returned by this filter...since it is an array with one object...use [0] at the end..
			vm.currentBook = books.filter(function(item){
				return item.book_id == $routeParams.bookID;
			})[0];
			console.log(vm.currentBook);
		});

	}
})();