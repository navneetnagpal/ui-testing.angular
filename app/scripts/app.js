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
                    url: '/abc',
                    templateUrl: 'views/home.html',
                    controller: "MainCtrl"
                })
                .state('home.create', {
                    url: '/create',
                    templateUrl: 'views/home.create.html',
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
                })
                .state('html', {
                    url: '/html/:type',
                    templateUrl: function($stateParams) {
                        return 'views/htmlcss/' + $stateParams.type + '.html';
                    }
                })
                 .state('d3js', {
                    url: '/d3js/:type',
                    templateUrl: function($stateParams) {
                        return 'views/d3js/' + $stateParams.type + '.html';
                    }
                })
                .state('pluginssamples', {
                    url: '/pluginssamples/:page',
                    templateUrl: function($stateParams) {
                        return 'views/plugins/' + $stateParams.page + '.html';
                    }
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
                    templateUrl: function($stateParams) {
                        return 'views/highcharts/simple-' + $stateParams.type + '-chart.html';
                    }
                })
                .state('css3', {
                    url: '/css3/:type',
                    templateUrl: function($stateParams) {
                        return 'views/css3/' + $stateParams.type + '.html';
                    }
                });
        }
    ]);