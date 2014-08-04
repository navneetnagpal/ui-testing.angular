angular.module('uiTestingangularApp.services').factory('loanOffer', ['$http',

    function($http) {

        return {
            getAvailableOffers: function() {
                var promise = $http.get('data/loanoffers.json').then(function(response) {
                    return response.data;
                }, function() {
                    throw {
                        message: "error in loading loanoffers"
                    };
                });
                return promise;
            }
        };
    }
]);