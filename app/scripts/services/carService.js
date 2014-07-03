angular.module('uiTestingangularApp.services').factory('carService', ['engineService',
    function(engineService) {
        var _methods = {
            getCarModel: function() {
                return "Car 2.0 ->" + engineService.getEngineModel() ;
            }

        };
        return {
            getCarModel: _methods.getCarModel,
            start:function(){
                engineService.start();
            }
        };
    }
])