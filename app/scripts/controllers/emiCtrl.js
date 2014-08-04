angular.module('uiTestingangularApp')
    .controller('EmiCtrl', ['$scope', 'emiCalculator','loanOffer',
        function($scope, emiCalculator,loanOffer) {
            'use strict';
            $scope.mode="schedule";
            $scope.offers=[];
            loanOffer.getAvailableOffers().then(function(data){
                $scope.offers = data;
            });

            $scope.calculate = function() {
                $scope.results = emiCalculator.getEmiSchedule($scope.loanAmount, $scope.roi, $scope.tenure);
                $scope.details = emiCalculator.calculateEmi($scope.loanAmount, $scope.roi, $scope.tenure);
                if (!$scope.$$phase){ 
                    $scope.$digest();
                }
            } 

            $scope.select = function(){
                $scope.loanAmount=this.offer.loan;
                $scope.roi=this.offer.roi;
                $scope.tenure=this.offer.tenure;
                $scope.calculate();
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