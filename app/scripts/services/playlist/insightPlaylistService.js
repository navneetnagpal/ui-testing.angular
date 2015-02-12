angular.module('uiTestingangularApp.services').factory('insightPlaylistService', ['$http',
    'playlistService',

    function($http, playlistService) {
        var child = Object.create(playlistService);

        child.getAll = function() {
            return $http.get('data/playlists/insights.json');
        }
        return child;

    }
]);