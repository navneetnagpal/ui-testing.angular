describe('TestApp:Services>Loan Offer', function() {

    var loanOffer, $httpBackend;
    beforeEach(module("uiTestingangularApp"));
    var testJson = UiTestMock.LoanOfferTestData;

    beforeEach(inject(function(_loanOffer_, _$httpBackend_, $q) {
        loanOffer = _loanOffer_;
        $httpBackend = _$httpBackend_;
        var $defer = $q.defer();
        $defer.resolve(testJson)
        testJson = UiTestMock.LoanOfferTestData;
        $httpBackend.whenGET('data/loanoffers.json').respond($defer.promise);
    }));
    describe('Loan Offer::Basic', function() {

        it('it should be defined', function() {
            expect(loanOffer).toBeDefined();
        });
        it('should have loanOffer.getAvailableOffers() method', function() {
            expect(loanOffer.getAvailableOffers).toBeDefined();
            expect(typeof loanOffer.getAvailableOffers).toBe('function');
        });
        it('should send request to server for get data', function() {
            var result = loanOffer.getAvailableOffers();
            result.then(function(data) {
                expect(testJson).toBe(data);
            });
            $httpBackend.flush();
        });

    });


});