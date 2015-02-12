describe('TestApp:Services>EMI Calculator', function() {

    var emiCalculator;
    beforeEach(module("uiTestingangularApp"));

    beforeEach(inject(function(_emiCalculator_) {
        emiCalculator = _emiCalculator_;
        //spyOn(emiCalculator,"calculateEmi").and.throwError("principal should be numeric")
    }));
    var testJson = UiTestMock.EmiCalcTestData;
    describe('Emi Calculator::Basic', function() {

        it('It should be defined', function() {
            expect(emiCalculator).toBeDefined();
        });
        it('Should have emiCalculator.calculateEmi() method', function() {
            expect(emiCalculator.calculateEmi).toBeDefined();
            expect(typeof emiCalculator.calculateEmi).toBe('function');
        });
        it('Should have emiCalculator.getEmiSchedule() method', function() {
            expect(emiCalculator.getEmiSchedule).toBeDefined();
            expect(typeof emiCalculator.getEmiSchedule).toBe('function');
        });
    });
    describe('Emi Calculator::Input validation', function() {

        it('It should throw error when principal is not numeric', function() {
            expect(function() {
                emiCalculator.calculateEmi('emi', 1, 10);
            }).toThrow("principal should be numeric");
        });
        it('It should throw error when roi is not numeric', function() {
            expect(function() {
                emiCalculator.calculateEmi(100, 'emi', 10);
            }).toThrow("roi should be numeric");
        });
        it('It should throw error when tenure is not numeric', function() {
            expect(function() {
                emiCalculator.calculateEmi(100, 10, 'emi');
            }).toThrow("tenure should be numeric");
        });
        it('It should throw error when principal is <=0 ', function() {
            expect(function() {
                emiCalculator.calculateEmi(0, 1, 10);
            }).toThrow();
        });
        it('It should throw error when roi <=0 ', function() {
            expect(function() {
                emiCalculator.calculateEmi(100, 0, 10);
            }).toThrow();
        });
        it('It should throw error when tenure <=0 ', function() {
            expect(function() {
                emiCalculator.calculateEmi(100, 10, 0);
            }).toThrow();
        });
    });
    describe('Emi Calculator::EMI Verification', function() {

        for (var count = 0, max = testJson.length; count < max; count++) {
            (function(input, output) {
                it(['should return emi=', output.emi, '/- on loan=', input.loan, "/- roi=" + input.roi + " tenure=" + input.tenure].join(''), function() {
                    var retObj = emiCalculator.calculateEmi(input.loan, input.roi, input.tenure)
                    expect(Utils.Number.isEqual(output.emi, retObj.emi, 1)).toBe(true)
                    expect(Utils.Number.isEqual(output.interest, retObj.interest, 1)).toBe(true)
                    expect(Utils.Number.isEqual(output.totalAmount, retObj.totalAmount, 1)).toBe(true)
                });
            })(testJson[count].input, testJson[count].output)
        }
    });

    describe('Emi Calculator::EMI schedule months', function() {

        for (var count = 0, max = testJson.length; count < max; count++) {
            (function(input, output) {
                it(['should return total emi=', output.schedule.length, ' on loan=', input.loan, "/- roi=" + input.roi + " tenure=" + input.tenure].join(''), function() {
                    var retObj = emiCalculator.getEmiSchedule(input.loan, input.roi, input.tenure);
                    expect(output.schedule.length).toBe(retObj.length);
                });
            })(testJson[count].input, testJson[count].output)
        }
    });


    for (var count = 0, max = testJson.length; count < max; count++) {
        (function(no, input, output) {
            describe('Emi Calculator::Test#' + no + ' loan=' + input.loan + ' roi=' + input.roi + ' tenure=' + input.tenure, function() {
                it('shoud match the schedule of interest', function() {
                    var results = emiCalculator.getEmiSchedule(input.loan, input.roi, input.tenure);
                    for (var jcount = 0, jMax = output.schedule.length; jcount < jMax; jcount++) {
                        expect(true).toBe(Utils.Number.isEqual(results[jcount].interest, output.schedule[jcount].interest, .10));
                        // expect(true).toBe(Utils.Number.isEqual(results[jcount].principal, output.schedule[jcount].principal, .10));
                        // expect(true).toBe(Utils.Number.isEqual(results[jcount].principalYtd, output.schedule[jcount].principalYtd, .10));
                        // expect(true).toBe(Utils.Number.isEqual(results[jcount].balance, output.schedule[jcount].balance, .10));
                    }

                });
                it('shoud match the schedule of principal', function() {
                    var results = emiCalculator.getEmiSchedule(input.loan, input.roi, input.tenure);
                    for (var jcount = 0, jMax = output.schedule.length; jcount < jMax; jcount++) {
                        // expect(true).toBe(Utils.Number.isEqual(results[jcount].interest, output.schedule[jcount].interest, .10));
                        expect(true).toBe(Utils.Number.isEqual(results[jcount].principal, output.schedule[jcount].principal, .10));
                        // expect(true).toBe(Utils.Number.isEqual(results[jcount].principalYtd, output.schedule[jcount].principalYtd, .10));
                        // expect(true).toBe(Utils.Number.isEqual(results[jcount].balance, output.schedule[jcount].balance, .10));
                    }

                });
                it('shoud match the schedule of principalYtd', function() {
                    var results = emiCalculator.getEmiSchedule(input.loan, input.roi, input.tenure);
                    for (var jcount = 0, jMax = output.schedule.length; jcount < jMax; jcount++) {
                        // expect(true).toBe(Utils.Number.isEqual(results[jcount].interest, output.schedule[jcount].interest, .10));
                        // expect(true).toBe(Utils.Number.isEqual(results[jcount].principal, output.schedule[jcount].principal, .10));
                        expect(true).toBe(Utils.Number.isEqual(results[jcount].principalYtd, output.schedule[jcount].principalYtd, .10));
                        // expect(true).toBe(Utils.Number.isEqual(results[jcount].balance, output.schedule[jcount].balance, .10));
                    }

                });
                it('shoud match the schedule balance', function() {
                    var results = emiCalculator.getEmiSchedule(input.loan, input.roi, input.tenure);
                    for (var jcount = 0, jMax = output.schedule.length; jcount < jMax; jcount++) {
                        // expect(true).toBe(Utils.Number.isEqual(results[jcount].interest, output.schedule[jcount].interest, .10));
                        // expect(true).toBe(Utils.Number.isEqual(results[jcount].principal, output.schedule[jcount].principal, .10));
                        // expect(true).toBe(Utils.Number.isEqual(results[jcount].principalYtd, output.schedule[jcount].principalYtd, .10));
                        expect(true).toBe(Utils.Number.isEqual(results[jcount].balance, output.schedule[jcount].balance, .10));
                    }

                });

            });
        })(count + 1, testJson[count].input, testJson[count].output)
    }


});