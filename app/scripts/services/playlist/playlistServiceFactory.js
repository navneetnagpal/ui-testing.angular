angular.module('uiTestingangularApp.services').factory('playlistServiceFactory', ['playlistService',
    'insightPlaylistService',
    function(playlistService, insightPlaylistService) {
        var instances = {
            insights: insightPlaylistService
        }
        return {
            get: function(type) {
                return instances[type.toLowerCase()];
            }
        };
    }
]);