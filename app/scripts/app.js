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
                    controller: "EmiCtrl"
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
                })
                .state('webgl', {
                    url: '/webgl',
                    templateUrl: 'views/webgl/index.html',
                    controller: "MainCtrl"
                })
                .state('webgltest', {
                    url: '/webgltest',
                    templateUrl: 'views/webgl/test.html',
                    controller: "MainCtrl"
                })
                .state('cartest', {
                    url: '/cartest',
                    templateUrl: 'views/webgl/cartest.html',
                    controller: "MainCtrl"
                })
                .state('timelinebasic', {
                    url: '/timelinebasic',
                    templateUrl: 'views/timeline/timeline-basic.html',
                    controller: "timelineCtrl"
                });
        }
    ]);