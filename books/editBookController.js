(function(){
	angular.module("app")
	//have to inject $routeParams
	//no nneed to inject dataService into the controlleer..since call to the dataService is happening in the resolve propery...
	.controller('EditBookController', ['$routeParams', 'books','$cookies','$cookieStore', EditBookController]);
	function EditBookController($routeParams, books, $cookies, $cookieStore){
		var vm= this;

		vm.currentBook = books.filter(function(item){
			return item.id == $routeParams.bookID;
		})[0];

		console.log(vm.currentBook);

		vm.setAsFavorite = function(){
			$cookies.favoriteBook = vm.currentBook.name;	
		}

		$cookieStore.put('lastEdited', vm.currentBook);
	}
})();