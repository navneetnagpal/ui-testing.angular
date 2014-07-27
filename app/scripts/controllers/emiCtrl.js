angular.module('uiTestingangularApp')
    .controller('EmiCtrl', ['$scope', 'emiCalculator',
        function($scope, emiCalculator) {
            'use strict';
            $scope.mode="schedule";
            $scope.calculate = function() {
                $scope.results = emiCalculator.getEmiSchedule($scope.loanAmount, $scope.roi, $scope.tenure);
                $scope.details = emiCalculator.calculateEmi($scope.loanAmount, $scope.roi, $scope.tenure);
                if (!$scope.$$phase)
                    $scope.$digest();
            } 
            $scope.reset = function(){
                $scope.results=[];
                $scope.details =null;
                $scope.loanAmount="";
                $scope.roi="";
                $scope.tenure="";
            }

        }
    ]);