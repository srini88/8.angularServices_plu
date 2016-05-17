(function(){
	angular.module('app')
	.factory('dataService', ['$q','$timeout','$http','constants', dataService]);
	
	function dataService($q, $timeout, $http, constants){
		//making actual calls to web service now...using postman client..
		// http://jsonplaceholder.typicode.com/
		//keeping implementation details out of my controller, so putting then here ...also putting then in the calling code..as we are using return statements..
		//this way calling controller is unaware how the data is retrived..
		function getAllBooks(){
			return $http({
				method :'GET',
				url:'http://jsonplaceholder.typicode.com/users/',
				headers :{
					'PS-BookLogger-Version' : constants.APP_VERSION
				}
			})
			.then(sendResponseData)
			.catch(sendGetBooksError);

			function sendResponseData(response){
				console.log( response.data);
				return response.data;
			}
			function sendGetBooksError(response){
				return $q.reject("Error retrieving books(s), HTTP status: " + response.status);
			}

		}
		function getAllReaders(){
			var readersArray = [

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

			var deferred = $q.defer();

			$timeout(function(){
				var success = true;
				if (success){
					deferred.resolve(readersArray);
				}
				else{
					deferred.reject("failed to fecth readers");
				}
				

			}, 1000);
			return deferred.promise;


		}

		return {
			getAllBooks:getAllBooks,
			getAllReaders:getAllReaders
		};
	}

})();