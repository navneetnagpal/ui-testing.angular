describe('uiTestingangularApp: car service test', function() {

    var emiCalculator;
    beforeEach(module("uiTestingangularApp"));

    beforeEach(inject(function(_emiCalculator_) {
        emiCalculator = _emiCalculator_;
    }));
    describe('Emi Calculator::Basic', function() {

        it('It should be defined', function() {
            expect(emiCalculator).toBeDefined();
        });
        it('Should have emiCalculator.calculateEmi() method',function(){
            expect(emiCalculator.calculateEmi).toBeDefined();
            expect(typeof emiCalculator.calculateEmi).toBe('function');
        });
        it('Should have emiCalculator.calculateEmi() method',function(){
            expect(emiCalculator.calculateEmi).toBeDefined();
            expect(typeof emiCalculator.calculateEmi).toBe('function');
        });
    });

});