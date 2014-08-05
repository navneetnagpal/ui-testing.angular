angular.module('mockE2e', ['uiTestingangularApp', 'ngMockE2E'])
    .run(function($httpBackend) {
        console.log('Test platform bootstrapping');
        $httpBackend.whenGET('data/menu.json').respond(UiTestMock.MenuTestData);
        $httpBackend.whenGET('data/loanoffers.json').respond(UiTestMock.LoanOfferTestData);

        $httpBackend.whenGET('views/home.html').passThrough();
        $httpBackend.whenGET('views/emicalc.html').passThrough();
        /*  $httpBackend.whenPOST('/events').respond(function(method, url, data) {
                data._id = 123456789;
                return [200, angular.toJson(data), {}];
            });
            $httpBackend.whenDELETE('/events/' + sampleEventId).respond(function(method, url, data) {
                return [200, {
                    delete: sampleEvent
                }, {}];
            });*/
        console.log('Test platform bootstrapping ... done');
    });