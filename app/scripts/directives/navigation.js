angular.module('uiTestingangularApp.directives')
    .directive('navigation', ['$timeout', function ($timeout) {
       
      return {
      	 restrict: "A",
   			transclude: true,
         templateUrl: 'list-items.html',
         link: function(scope, element, attrs) {
            	console.log('directive'); 
         }
      };
    }]);