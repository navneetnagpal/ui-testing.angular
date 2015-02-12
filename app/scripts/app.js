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
                })
                .state('playlisttest', {
                    url: '/playlisttest',
                    templateUrl: 'views/playlist/playlist-test.html'
                })
                .state('playlistlibrary', {
                    url: '/playlistlibrary',
                    templateUrl: 'views/playlist/playlist-library.html'
                })
                .state('extjssimplegrid', {
                    url: '/extjssimplegrid',
                    templateUrl: 'views/extjs/simple-grid.html'
                })
                .state('editorgrid', {
                    url: '/editorgrid',
                    templateUrl: 'views/extjs/editor-grid.html'
                }).state('html', {
                    url: '/html',
                    templateUrl: 'views/htmlcss/html.html'
                })
                .state('bsimagegallary', {
                    url: '/bsimagegallary',
                    templateUrl: 'views/bootstrap/bsimagegallary.html'
                })
                .state('imagegall1', {
                    url: '/imagegall1',
                    templateUrl: 'views/bootstrap/imagegallary.html'
                })
                .state('simplehighchart', {
                    url: '/simplehighchart/:type',
                    templateUrl:function($stateParams){ 
                        return 'views/highcharts/simple-'+ $stateParams.type+'-chart.html';
                    } //'views/highcharts/simplebarchart.html'
                })
                ;
        }
    ]);