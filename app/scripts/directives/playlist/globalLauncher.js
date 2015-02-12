angular.module('uiTestingangularApp.directives')
    .directive('globalLauncher', ['$rootScope', '$timeout', 'playlistOverlayService',
        function($rootScope, $timeout, playlistOverlayService) {

            return {
                restrict: "A",
                link: function(scope, element, attrs) {
                    $(element).on('click', '.plist-trigger', function(evt) {
                        playlistOverlayService.setParams({
                            target: $(evt.target),
                            path: $(evt.target).attr('data-path'),
                            showOverlay: $(evt.target).attr('show-overlay'),
                            isGrouper: $(evt.target).attr('mode') === 'grouper'
                        });
                        $rootScope.$digest();
                    })

                }
            };
        }
    ]);