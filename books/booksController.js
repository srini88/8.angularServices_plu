(function (){

console.log(angular.module('app')); //prints a big object
angular.module('app').
controller('BooksController', BooksController);

//got to inject the books service...into this controller
//using controller as syntax, so no scope shit here..
function BooksController(books){

	var vm = this;
	//calling the service and getting the properties
	vm.appName = books.appName;
	vm.appDesc = books.appDesc;

}

})();