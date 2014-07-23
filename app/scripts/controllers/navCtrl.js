'use strict';

angular.module('uiTestingangularApp')
    .controller('NavCtrl', function($scope) {
        $scope.menu = UITesting.Menu;
    });