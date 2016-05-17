(function(){
	angular.module("app")
	//have to inject $routeParams
	//no nneed to inject dataService into the controlleer..since call to the dataService is happening in the resolve propery...
	.controller('EditBookController', ['$routeParams', 'books','$cookies','$cookieStore', EditBookController]);
	function EditBookController($routeParams, books, $cookies, $cookieStore){
		var vm= this;

		vm.currentBook = books.filter(function(item){
			return item.book_id == $routeParams.bookID;
		})[0];

		vm.setAsFavorite = function(){
			$cookies.favoriteBook = vm.currentBook.title;	
		}

		$cookieStore.put('lastEdited', vm.currentBook);
	}
})();