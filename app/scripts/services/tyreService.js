angular.module('uiTestingangularApp.services').factory('tyreService', [
    function() {
        var _methods = {
            getTyreModel: function() {
                return "tyre 2.0";
            }
        };
        return {
            getTyreModel: function(){
                return _methods.gettyreModel();
            },
            left:function(){
                console.log(this.gettyreModel()+ ":left moved");
            }
        };
    }
]);