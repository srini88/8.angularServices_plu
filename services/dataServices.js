(function(){
	angular.module('app')
	//calling factory..
	//1st para - name for the service..
	.factory('dataService', ['$q','$timeout', dataService]);

	// have to create and return our serivce..this is the fn that will be attached to the $get property when provider is called behind the fields..
	function dataService($q, $timeout){

		function getAllBooks(){
			var booksArray =  [
				{
					book_id:1,
					title:'Harry Potter and Deatly Hallows',
					author: 'J.K.Rowling',
					year_published:2000
				},
				{
					book_id:2,
					title:'Cat in the Hat',
					author: 'Dr.Seuss',
					year_published:1965
				},
				{
					book_id:3,
					title:'Encyclopedia Brown',
					author: 'Donald Sobol',
					year_published:1969
				}
			];
			//create new deferred object..
			var deferred = $q.defer();

			$timeout(function(){

				var successful = false;
				if (successful){
					//u call resolve - when success and ready to return some data..
					deferred.resolve(booksArray);
				}
				else
				{	//failed and report problem -- to the caller..
					deferred.reject("error retrieving the books.");
				}


			}, 2000); ///even timeout function will also execute async
			//so as getAllBooks is running ...will immediately execute return next ..
			//deferred has a property named promise..
			///caller will receive the promise and use it to set up callback functions..
			return deferred.promise;

		}
		function getAllReaders(){
			return [

				{
					reader_id :1,
					name :'Marie',
					weeklyReadingGoal :315,
					totalMinutesRead :5600
				},
				{
					reader_id :2,
					name :'Daniel',
					weeklyReadingGoal :210,
					totalMinutesRead :2600
				},
				{
					reader_id :3,
					name :'Lanny',
					weeklyReadingGoal :140,
					totalMinutesRead :600
				}
			];
		}

		return {
			getAllBooks:getAllBooks,
			getAllReaders:getAllReaders
		};
	}

})();