angular.module('uiTestingangularApp.services').factory('menu', ['$http',

    function($http) {

        return {
            getAllMenus: function() {
                var promise = $http.get('data/menu.json').then(function(response) {
                    return response.data;
                }, function() {
                    throw {
                        message: "error in loading menu"
                    };
                });
                return promise;
            }
        };
    }
]);