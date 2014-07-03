describe('uiTestingangularApp: car service test', function() {

    var carService, httpBackend,
        engineService;
    beforeEach(module("uiTestingangularApp"));
    /* describe('Test round', function() {

        it('Test 1', function() {
            expect(true).toBeTruthy();
        });
    });*/
    beforeEach(inject(function(_carService_, $httpBackend, _engineService_) {
        carService = _carService_;
        engineService = _engineService_;
        httpBackend = $httpBackend;

        spyOn(engineService, "getEngineModel").andCallFake(function() {
            return "Mock Engine";
        });
        spyOn(engineService, "start");
    }));
    describe('car service general', function() {

        it('carService is defined', function() {
            expect(carService).toBeDefined();
        });
        it('getCarModel() should return string', function() {

            expect(carService.getCarModel()).toBe("Car 2.0 ->Mock Engine");
            expect(engineService.getEngineModel).toHaveBeenCalled();

        });
        it('start() should call engine.start()', function() {
            carService.start();
            expect(engineService.start).toHaveBeenCalled();

        });
    });



});