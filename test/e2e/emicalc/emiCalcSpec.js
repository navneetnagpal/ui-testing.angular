var Navigation = require('../commons/navigation');
var TestData = require('../../mock/emiCalcTestData');

describe('EMI Calculator', function() {
    var ptor = protractor.getInstance(),
        emiCalculator;
    //testJson=UiTestMock.EmiCalcTestData;
    it('should navigation successfully', function() {
        var mainNav = new Navigation();
        emiCalculator = mainNav.goto('emicalc');
        ptor.sleep(500);
        expect(emiCalculator.isDisplayed()).toBe(true);
    });

    it('should show up input form to enter data', function() {
        ptor.sleep(500);
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
                ptor.sleep(500);
                emiCalculator.enterData(testObj.input.loan, testObj.input.roi, testObj.input.tenure);
                expect(emiCalculator.isResultsVisible()).toBe(true);
            });
        })(i + 1, TestData[i]);

    };


});