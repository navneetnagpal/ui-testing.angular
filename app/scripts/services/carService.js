angular.module('uiTestingangularApp.services').factory('carService', ['engineService','tyreService',
    function(engineService,tyreService) {
        var _methods = {
            getCarModel: function() {
                return "Car 2.0 ->" + engineService.getEngineModel() ;
            }

        };
        return {
            getCarModel: _methods.getCarModel,
            start:function(){
                engineService.start();
            },
            left:function(){
                tyreService.left();
            }
        };
    }
]);