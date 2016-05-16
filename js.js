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
				return promises.push($http.get(el).catch(function(e){console.log("err individual failed ",e.data.text)})); 
			});
			var all = $q.all( promises ); //chaining promises array and passing it to $q.all 
			all.then(function success(d){
				console.log("Im printing d", d); //prints data array from all promises
				
				console.log(d.length);
				for (var i = 0; i < d.length; i++){
					if (d[i]){  //to prevent cannot read data of undefined
					$scope.output.push(d[i].data.text);
					}
				}
				console.log($scope.output);

				window.alert($scope.output.join(""));  //alerting the final output on the screen
				/// this catch is not getting called because it is being handled by the individual catch at line 20
			}).catch(function(reason){
				console.log("reason is ", reason);
				window.alert($scope.output.join(""));
			});
			});
	
});
})();