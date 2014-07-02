'use strict';

angular.module('uiTestingangularApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'pascalprecht.translate'
])
    .config(['$stateProvider', '$urlRouterProvider', '$translateProvider',
        function($stateProvider, $urlRouterProvider, $translateProvider) {
            $urlRouterProvider.otherwise('/');
            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: 'views/main.html',
                    controller: "MainCtrl"
                });
        }
    ]);