describe('Controller: EmiCtrl', function() {
    'use strict';

    // load the controller's module
    beforeEach(module('uiTestingangularApp'));

    var EmiCtrl,
        scope,
        testJson,
        $httpBackend,
        testJson = UiTestMock.LoanOfferTestData,
        emiCalculator,
        loanOffer;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope, _$httpBackend_,$q,_emiCalculator_,
        _loanOffer_) {
        scope = $rootScope.$new();
        loanOffer=_loanOffer_;
        emiCalculator=_emiCalculator_;
        spyOn(loanOffer,"getAvailableOffers").andCallThrough();
        spyOn(emiCalculator,"calculateEmi").andCallThrough();
        spyOn(emiCalculator,"getEmiSchedule").andCallThrough();
        $httpBackend = _$httpBackend_;
        EmiCtrl = $controller('EmiCtrl', {
            $scope: scope
        });
        var $defer = $q.defer();
        $defer.resolve(testJson)
        $httpBackend.whenGET('data/loanoffers.json').respond($defer.promise);
        $httpBackend.flush(); 
        spyOn(scope,"calculate").andCallThrough();
    }));
    
    it('should attach a list of avialable offers', function() {  
        expect(loanOffer.getAvailableOffers).toHaveBeenCalled();
        expect(scope.offers.length).toBe(2);
    });

    it('should attach a list results schedule on input of loan+roi+tenure', function() {
        scope.loanAmount=400000;
        scope.roi=15;
        scope.tenure=17;
        scope.calculate();
        expect(scope.results.length).toBe(17);
        expect(emiCalculator.getEmiSchedule).toHaveBeenCalled();      
        expect(emiCalculator.calculateEmi).toHaveBeenCalled();      

    });
    it('should attach a object of summary details on input of loan+roi+tenure', function() {
        scope.loanAmount=400000;
        scope.roi=13;
        scope.tenure=18;
        scope.calculate();
        expect(scope.details).toBeDefined();
        expect(parseInt(scope.details.emi)).toBe(24579);

    });
    it('reset() should clear the inputs', function() {
        scope.reset();
        expect(scope.loanAmount).toBe("");
        expect(scope.roi).toBe("");
        expect(scope.tenure).toBe("");

    });
    it('select() should enter the inputs and calls the calculate', function() {
        scope.select.apply({offer:{loan:11000,roi:14,tenure:12}});
        expect(scope.loanAmount).toBe(11000);
        expect(scope.roi).toBe(14);
        expect(scope.tenure).toBe(12);
        expect(scope.calculate).toHaveBeenCalled();
    });

});