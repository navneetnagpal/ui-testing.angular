angular.module('uiTestingangularApp')
    .controller('NavCtrl', ['$scope', 'menu',
        function($scope, menu) {
            'use strict';
            menu.getAllMenus().then(function(data) {
                $scope.menu = data;
            });
        }
    ]);