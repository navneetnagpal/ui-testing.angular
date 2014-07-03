angular.module('uiTestingangularApp.services').factory('engineService', [
    function() {
        var _methods = {
            getEngineModel: function() {
                return "Engine 2.0";
            }
        };
        return {
            getEngineModel: function(){
                return _methods.getEngineModel();
            },
            start:function(){
                console.log(this.getEngineModel()+ ":started");
            }
        };
    }
])