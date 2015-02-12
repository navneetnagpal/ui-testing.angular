angular.module('uiTestingangularApp.services').factory('playlistOverlayService', [

    function() {
        var _params = {},
            _playlistParams = {};
        return {
            getPath: function() {
                return _params.path;
            },
            setParams: function(params) {
                _params = params || {};
            },
            getParams: function() {
                return _params;
            },
            setPlaylistParams: function(params) {
                _playlistParams = params || {};
            },
            getPlaylistParams: function(params) {
                return _playlistParams;
            }
        };
    }
]);