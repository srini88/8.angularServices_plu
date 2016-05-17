(function (){


	angular.module ('app')
	.value('badgeService', {
		retrieveBadge :retrieveBadge
	});  //object literal just like constant 


	function retrieveBadge(minutesRead){
		//console.log("retriveBadge has been called");
		var badge = null;

		switch(true){

			case (minutesRead > 5000):
				badge = "Book Worm";
				break;
			case (minutesRead >2500):
				badge = "Page Turner";
				break;
			default :
				badge = "Getting Started";
				break;
		}
		return badge;  ///returning badge..
	}

})();