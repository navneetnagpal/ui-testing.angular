describe('uiTestingangularApp: emi service', function() {
    var $injector = angular.injector(['uiTestingangularApp']);
    var emiService = $injector.get('emiService');
  
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