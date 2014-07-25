angular.module('uiTestingangularApp.services').factory('emiCalculator', [
    function() {
        var _methods = {
            isNumeric:function(input){
                var nums="01234567890";
                input=input.toString();
                for(var count=input.length-1;count>=0;count--) {
                    if (nums.indexOf(input.charAt(count))==-1) { return false;}
                }
                return true;
            },
            validateInputs:function(principal,roi,tenure){
                if (!principal || !_methods.isNumeric(principal)) {
                    throw {message:"principal should be numeric"};
                }
                if (!roi || !_methods.isNumeric(roi)) {
                    throw {message:"roi should be numeric"};
                }
                if (!tenure || !_methods.isNumeric(tenure)) {
                    throw {message:"tenure should be numeric"};
                }
            }
        };
        return {
            calculateEmi: function(principal,roi,tenure){
                _methods.validateInputs(principal,roi,tenure);
            }             
        };
    }
]);