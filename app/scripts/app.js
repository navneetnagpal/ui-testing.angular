angular.module('uiTestingangularApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'uiTestingangularApp.controllers',
    'uiTestingangularApp.directives',
    'uiTestingangularApp.services',
    'uiTestingangularApp.filters',
    'pascalprecht.translate'
])
    .config(['$stateProvider', '$urlRouterProvider', '$translateProvider',
        function($stateProvider, $urlRouterProvider, $translateProvider) {
            'use strict';
            $urlRouterProvider.otherwise('/');
            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: 'views/home.html',
                    controller: "MainCtrl"
                }) 
                .state('emicalc', {
                    url: '/emicalc',
                    templateUrl: 'views/emicalc.html',
                    controller: "EmiCtrl"
                }) ;
        }
    ]);