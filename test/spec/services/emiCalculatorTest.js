describe('uiTestingangularApp: car service test', function() {

    var emiCalculator;
    beforeEach(module("uiTestingangularApp"));

    beforeEach(inject(function(_emiCalculator_) {
        emiCalculator = _emiCalculator_;
        //spyOn(emiCalculator,"calculateEmi").and.throwError("principal should be numeric")
    }));
    describe('Emi Calculator::Basic', function() {

        it('It should be defined', function() {
            expect(emiCalculator).toBeDefined();
        });
        it('Should have emiCalculator.calculateEmi() method',function(){
            expect(emiCalculator.calculateEmi).toBeDefined();
            expect(typeof emiCalculator.calculateEmi).toBe('function');
        });         
    });
    describe('Emi Calculator::Input validation', function() {

        it('It should throw error when principal is not numeric', function() {
            expect(function(){
                emiCalculator.calculateEmi('emi',1,10);
            }).toThrow("principal should be numeric");
        });
        it('It should throw error when roi is not numeric',function(){
              expect(function(){
                emiCalculator.calculateEmi(100,'emi',10);
            }).toThrow();
        });   
        it('It should throw error when tenure is not numeric',function(){
              expect(function(){
                emiCalculator.calculateEmi(100,10,'emi');
            }).toThrow();
        });  
         it('It should throw error when principal is <=0 ', function() {
            expect(function(){
                emiCalculator.calculateEmi(0,1,10);
            }).toThrow();
        });
        it('It should throw error when roi <=0 ',function(){
              expect(function(){
                emiCalculator.calculateEmi(100,0,10);
            }).toThrow();
        });   
        it('It should throw error when tenure <=0 ',function(){
              expect(function(){
                emiCalculator.calculateEmi(100,10,0);
            }).toThrow();
        });     
    });

});