describe('uiTestingangularApp: emi service', function() {
    
    var emiService;
    beforeEach(module("uiTestingangularApp"));
    /* describe('Test round', function() {

        it('Test 1', function() {
            expect(true).toBeTruthy();
        });
    });*/
    beforeEach(inject(function(_emiService_, $httpBackend) {
        emiService = _emiService_;
        
    }));
    describe('emiService should be available with required operations', function() {

        it('emiService is defined', function() {
            expect(emiService).toBeDefined();
        });
        it('getAccount is defined & type should be function', function() {
            expect(emiService.getEmi).toBeDefined();
            expect(typeof emiService.getEmi).toBe("function");
        }); 
    });
   


});