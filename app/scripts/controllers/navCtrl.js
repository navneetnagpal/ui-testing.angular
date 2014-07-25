angular.module('uiTestingangularApp')
    .controller('NavCtrl', function($scope) {
        'use strict';
        $scope.menu = UITesting.Menu;
    });