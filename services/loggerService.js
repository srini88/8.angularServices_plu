(function(){
	//factory vs service....
	/// service as a constructor and executes with new..
	///// when doing with inheritance shit..

	angular.module('app')
	.service('logger', BookAppLogger);
	//the above service will create BookAppLogger with new operator
	/// which guarentees prototype hierarcy will be traversed correctly.


	//Base constructor..
	function LoggerBase(){

	}
	LoggerBase.prototype.output = function(message){
		console.log("LoggerBase : " + message);
	};
	//inherits from LoggerBase
	function BookAppLogger(){
		LoggerBase.call(this);
		//new method logBook
		this.logBook = function (book){ //passing in book that has title
			console.log("Book title: " + book.title);
		}
	}
	//needed
	BookAppLogger.prototype = Object.create(LoggerBase.prototype);
	//now use BookAppLogger as a service in our Angular App

})();