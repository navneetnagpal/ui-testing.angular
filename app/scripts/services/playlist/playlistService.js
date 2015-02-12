angular.module('uiTestingangularApp.services').factory('playlistService', ['$http',

    function($http) {
        return {
            getByPath: function(path) {
                return $http.get(path);
            }
        };
    }
]);