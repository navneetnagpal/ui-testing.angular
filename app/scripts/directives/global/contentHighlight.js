angular.module('uiTestingangularApp.directives')
    .directive('contentHighlight', ['$timeout',
        function($timeout) {
            // 'use strict';
            return {
                restrict: "A",
                scope: {
                    item: '=item'
                },
                templateUrl: '/views/templates/global/content-highlight.html',
                link: function(scope, element, attrs) {
                    
                }
            };
        }
    ]);