describe('uiTestingangularApp: car service test', function() {

    var carService, httpBackend,
        engineService,
        tyreService;
    beforeEach(module("uiTestingangularApp"));
   
    beforeEach(inject(function(_carService_, $httpBackend, _engineService_,_tyreService_) {
        carService = _carService_;
        engineService = _engineService_;
        tyreService=_tyreService_;
        httpBackend = $httpBackend;

        spyOn(engineService, "getEngineModel").andCallFake(function() {
            return "Mock Engine";
        });
        spyOn(engineService, "start");
        spyOn(tyreService, "left");
    }));
    describe('Car::Engine', function() {

        it('Car object should be ok', function() {
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
  describe('Car::Tyres', function() {
  
        it('Car.left() should call tyre.left()', function() {
            carService.left();
            expect(tyreService.left).toHaveBeenCalled();

        });
    });


});