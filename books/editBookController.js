(function(){
	angular.module("app")
	//have to inject $routeParams
	//no nneed to inject dataService into the controlleer..since call to the dataService is happening in the resolve propery...
	.controller('EditBookController', ['$routeParams', 'books','$cookies','$cookieStore', EditBookController]);
	function EditBookController($routeParams, books, $cookies, $cookieStore){
		var vm= this;
		// better to use .then on books as books return a promise
		//return dataService.getAllBooks(); ..im not use .then
		vm.currentBook = books.filter(function(item){
			return item.book_id == $routeParams.bookID;
		})[0];

		//cerate a button in the view for this
		vm.setAsFavorite = function(){
			$cookies.favoriteBook = vm.currentBook.title;	
		}

		//favorite book 
		//above is just string favoriteBook as key..
		///below we are storing an object..
		//lastEdited is the key..
		$cookieStore.put('lastEdited', vm.currentBook);
		//we want to display the favorite book and link to the lastEdited book on the homepage..


		//console.log(vm.currentBook);
	}
})();