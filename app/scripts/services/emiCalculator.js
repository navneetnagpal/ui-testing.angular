angular.module('uiTestingangularApp.services').factory('emiCalculator', [

    function() {
        var _methods = {
            isNumeric: function(input) {
                var nums = "01234567890";
                input = input.toString();
                for (var count = input.length - 1; count >= 0; count--) {
                    if (nums.indexOf(input.charAt(count)) == -1) {
                        return false;
                    }
                }
                return true;
            },
            validateInputs: function(principal, roi, tenure) {
                if (!principal || !_methods.isNumeric(principal)) {
                    throw {
                        message: "principal should be numeric"
                    };
                }
                if (!roi || !_methods.isNumeric(roi)) {
                    throw {
                        message: "roi should be numeric"
                    };
                }
                if (!tenure || !_methods.isNumeric(tenure)) {
                    throw {
                        message: "tenure should be numeric"
                    };
                }
            },
            getInterestYearly: function(p, roi) {
                return (p * roi / 100);
            },
            getInterestMonthly: function(p, roi) {
                return (_methods.getInterestYearly(p, roi) / 12).toFixed(2) * 1;
            },
            getEmi: function(p, roi, tenure) {
                var r = roi / 12 / 100;
                pr = Math.pow(1 + r, tenure),
                prn1 = Math.pow(1 + r, tenure) - 1,
                emi = p * r * pr / prn1;
                return {
                    emi: emi.toFixed(2) * 1,
                    interest: ((emi * tenure - p).toFixed(2) * 1),
                    totalAmount: ((p+(emi * tenure - p)).toFixed(2) * 1)
                };
            }
        };
        return {
            calculateEmi: function(principal, roi, tenure) {
                _methods.validateInputs(principal, roi, tenure);
                return _methods.getEmi(principal, roi, tenure);
            },
            getEmiSchedule: function(principal, roi, tenure) {
                _methods.validateInputs(principal, roi, tenure);
                var emi = _methods.getEmi(principal, roi, tenure),
                    results = [],
                    pPaid = 0,
                    iPaid = 0;
                for (var count = 1; count <= tenure; count++) {
                    iPaid = _methods.getInterestMonthly(principal - pPaid, roi);
                    pPaid = pPaid + (emi.emi - iPaid);
                    results.push({
                        no: count,
                        emi: emi.emi,
                        interest: iPaid,
                        principal: (emi.emi - iPaid),
                        principalYtd: pPaid,
                        balance: (principal - pPaid).toFixed(2) * 1
                    });
                }
                return results;
            }
        };
    }
]);