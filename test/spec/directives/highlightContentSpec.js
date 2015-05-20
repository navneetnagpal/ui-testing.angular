describe('directive: soa-history', function() {
    var element, scope, $httpBackend;

    beforeEach(module('templates'));
    beforeEach(module('uiTestingangularApp'));

    beforeEach(inject(function($rootScope, $compile, _$httpBackend_) {
        scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;
        element = '<div content-highlight=""></div>';
        element = $compile(element)(scope);

    }));
   
    describe("highlight-content: Basic", function() {
        it('should create expected structure', function() {
            scope.$digest();
            expect((element).find('.caption').length).toBe(1);
            expect((element).find('.sub-caption').length).toBe(1);
            expect((element).find('.actions').length).toBe(1);
        });
    });
});