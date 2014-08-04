var Navigation = require('../commons/navigation'),
TestData = require('../../mock/mockData').EmiCalcTestData;

describe('EMI Calculator', function() {
    var ptor,emiCalculator;
    beforeEach(function() {
        ptor = protractor.getInstance();
    });
    it('should navigation successfully', function() {
        var mainNav = new Navigation();
        emiCalculator = mainNav.goto('emicalc');
        expect(emiCalculator.isDisplayed()).toBe(true);
    });

    it('should show up input form to enter data', function() {
        expect(emiCalculator.isFormAvailable()).toBe(true);
    });
    it('should show results after enter data', function() {
        emiCalculator.enterData(100000, 12, 13);
        expect(emiCalculator.isResultsVisible()).toBe(true);
    });
    it('should clear data on reset', function() {
        emiCalculator.reset();
        expect(emiCalculator.isResultsVisible()).toBe(false);
    });

    for (var i = 0, max = TestData.length - 1; i <= max; i++) {
        (function(no, testObj) {
            it('Test#' + no + ' loan=' + testObj.input.loan, function() {
                emiCalculator.reset();
                expect(emiCalculator.isResultsVisible()).toBe(false);
                emiCalculator.enterData(testObj.input.loan, testObj.input.roi, testObj.input.tenure);
                expect(emiCalculator.isResultsVisible()).toBe(true);
            });
        })(i + 1, TestData[i]);

    };

    it('should select 1st offer from avialable offers',function(){
        emiCalculator.selectOffer(1);
        expect(emiCalculator.isResultsVisible()).toBe(true);
    });
     it('should select 2nd offer from avialable offers',function(){
        emiCalculator.selectOffer(2);
        expect(emiCalculator.isResultsVisible()).toBe(true);
    });


});