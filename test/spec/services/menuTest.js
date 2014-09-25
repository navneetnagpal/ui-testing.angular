describe('TestApp:Services>Menu', function() {

    var menu, $httpBackend;
    beforeEach(module("uiTestingangularApp"));
    var testJson = UiTestMock.MenuTestData;

    beforeEach(inject(function(_menu_, _$httpBackend_, $q) {
        menu = _menu_;
        $httpBackend = _$httpBackend_;
        testJson = UiTestMock.MenuTestData;
        $httpBackend.whenGET('data/menu.json').respond(testJson);
    }));
    describe('Menu::Basic', function() {

        it('it should be defined', function() {
            expect(menu).toBeDefined();
        });
        it('should have menu.getAllMenus() method', function() {
            expect(menu.getAllMenus).toBeDefined();
            expect(typeof menu.getAllMenus).toBe('function');
        });
        it('should send request to server for get data', function() {
            var result = menu.getAllMenus();
            result.then(function(data) {
                expect(testJson.length).toBe(data.length);
            });
            $httpBackend.flush();
        });

    });


});