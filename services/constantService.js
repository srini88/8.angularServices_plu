///place to define and reference several constant values..
///all constant shit in one place..
(function(){
	//object literal 2nd para
	angular.module('app')
	.constant('constants',{
		APP_TITLE :'Book Logger via Constant',
		APP_DESCRIPTION : 'Track Books you read via Constant',
		APP_VERSION :'1.0'
	});

})();