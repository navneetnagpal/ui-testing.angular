angular.module('uiTestingangularApp')
    .controller('LibraryController', ['$scope','playlistOverlayService',
        function($scope,playlistOverlayService ) {
            'use strict';
             
             $scope.$watch(function(){ return playlistOverlayService.getPlaylistParams().path; },
             function(newVal,oldVal){
                if (newVal && !playlistOverlayService.getPlaylistParams().isGrouper && playlistOverlayService.getPlaylistParams().showOverlay==='false') {
                    $scope.selectedPath = newVal;
                }
             });

        }
    ]).controller('InsightsCtrl', ['$scope','playlistOverlayService',
        function($scope,playlistOverlayService ) {
            'use strict';
            /* $scope.$watch(function(){ return playlistOverlayService.getPath() },
             function(newVal,oldVal){
                if (newVal && !playlistOverlayService.getParams().isGrouper) {
                    $scope.selectedPath = newVal;
                }
             });    */         

        }
    ]);