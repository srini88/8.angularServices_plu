//using IIFE to prevent polluting the global namespace
(function(){
	angular.module('app', [])
	.controller('mainController', function($scope,$http, $q) { //minification friendly
        
	console.log("Hi");
    var dataObj = {name : "hi"};	
		$http({
			method:'POST',
			url :'http://www.mocky.io/v2/571976b52500007921856cf1',
			data : dataObj,
			headers : {'Content-Type' : 'application/x-www-form-urlencoded'} //without this header, the server not accepting request
		})
		.then(function(response) {
			var items = response.data;
			console.log(items);
			var promises = [];
			$scope.output =[];
			items.forEach(function(el){
				return promises.push($http.get(el)); //fills the promises[] array
			});
	
			var ignore = function(x) { return x.catch(function(e){console.log("error individual failed ",e)}); } // To only accept responses with status 200, if a promise returns a bad status code, it will be caught here and the rest of the promises will move on
			var all = $q.all( promises.map(ignore) ); //chaining promises array and passing it to $q.all 
			all.then(function success(d){
				console.log("Im printing d", d); //prints data array from all promises
				
				console.log(d.length);
				for (var i = 0; i < d.length; i++){
					if (d[i]){  //to prevent cannot read data of undefined
					$scope.output.push(d[i].data.text);
					}
				}
				console.log(res);

				window.alert($scope.output.join(""));  //alerting the final output on the screen
			}).catch(function(reason){
				console.log("reason is ", reason);
				window.alert($scope.output.join(""));
			});
			});
	
});
})();