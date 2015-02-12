angular.module('uiTestingangularApp.directives')
    .directive('playlistOverlay', ['$timeout', 'playlistOverlayService',
        function($timeout, playlistOverlayService) {

            return {
                restrict: "A",
                controller: ['$scope', 'playlistServiceFactory', 'playlistOverlayService',
                    function($scope, playlistServiceFactory,
                        playlistOverlayService) {
                        'use strict';
                        $scope.pathChanged = function(path) {
                            playlistServiceFactory.get('insights').getByPath(path).then(function(response) {
                                $scope.data = response.data;
                            });
                        };
                    }
                ],
                templateUrl: 'playlist-overlay.html',
                link: function(scope, element, attrs) {

                    scope.selectPlaylist = function(evnt) {
                        var params = {
                            target: $(evnt.target),
                            path: $(evnt.target).attr('data-path'),
                            showOverlay: $(evnt.target).attr('show-overlay'),
                            isGrouper: $(evnt.target).attr('mode') === 'grouper'
                        };
                        if ($(evnt.target).attr('show-overlay') !== 'false') {
                            playlistOverlayService.setParams(params);
                        } else {
                            playlistOverlayService.setPlaylistParams(params);
                            scope.close();
                        }
                    }
                    scope.close = function() {
                        playlistOverlayService.setParams({});
                        scope.closeOverlay();
                    }
                    scope.closeOverlay = function() {
                        element.fadeOut();
                    }
                    scope.$watch(function() {
                        return playlistOverlayService.getPath()
                    }, function(newVal, oldVal) {
                        if (newVal !== undefined) {
                            // if (playlistOverlayService.getParams().showOverlay!=='false'){
                            scope.showOverlay = playlistOverlayService.getParams().showOverlay;
                            scope.pathChanged(newVal);
                            element.fadeIn();
                            // }
                        }
                    });
                }
            };
        }
    ]);