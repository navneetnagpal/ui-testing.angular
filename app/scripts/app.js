'use strict';

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
            $urlRouterProvider.otherwise('/');
            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: 'views/home.html',
                    controller: "MainCtrl"
                })
                .state('3dperspectives', {
                    url: '/3dperspectives',
                    templateUrl: 'views/3dperspective.html',
                    controller: "MainCtrl"
                })
                .state('alltest', {
                    url: '/alltest',
                    templateUrl: 'views/alltest.html',
                    controller: "MainCtrl"
                })
                .state('emicalc', {
                    url: '/emicalc',
                    templateUrl: 'views/emicalc.html',
                    controller: "MainCtrl"
                })
                .state('d3home', {
                    url: '/d3home',
                    templateUrl: 'views/d3home.html',
                    controller: "MainCtrl"
                })
                .state('d3home.basicbar1', {
                    url: '/d3home/basicbar1',
                    templateUrl: 'views/basicbar1.html',
                    controller: "MainCtrl"
                })
                .state('d3home.basicpie1', {
                    url: '/d3home/basicpie1',
                    templateUrl: 'views/basicpie1.html',
                    controller: "MainCtrl"
                });
        }
    ]);