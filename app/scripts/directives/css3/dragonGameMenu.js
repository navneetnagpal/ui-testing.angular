angular.module('uiTestingangularApp.directives')
    .directive('dragonGameMenu', [

        function() {

            return {
                restrict: "E",
                link: function(scope, element, attrs) {
                    var $element = $(element),
                        $menuContainer = $element.find('.menu-container'),
                        $menuList = $menuContainer.find('.menu-list'),
                        moverId,
                        prevMoverCords,
                        perCentage = 30;

                   /* $menuContainer.on('mousemove', function(e) {
                        if (e.clientX > (window.screen.width / 2)) {
                            $menuList.css({
                                'left': [35, '%'].join('')
                            });

                            console.log(["left", prevMoverCords.x, e.clientX, 'diff', Math.abs(prevMoverCords.x - e.clientX)]);
                        } else if (e.clientX < (window.screen.width / 2)) {
                            $menuList.css({
                                'left': [25, '%'].join('')
                            });
                            console.log(["right", prevMoverCords.x, e.clientX, 'diff', Math.abs(prevMoverCords.x - e.clientX)]);
                        } else {
                            $menuList.css({
                                'left': [30, '%'].join('')
                            });
                        }
                    });*/
                }
            };
        }
    ]);