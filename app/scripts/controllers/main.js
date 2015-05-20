angular.module('uiTestingangularApp')
    .controller('MainCtrl', function($scope) {
        'use strict';

        $scope.recentUpdates = [{
            type: 'highcharts',
            title: 'A complex chart',
            'sub_title': 'highcharts',
            link_name: 'See Sample',
            link: "simplehighchart({'type':'skillpie'})",
            link_similar: 'looks',
            link_similar_name: 'More like this',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla sequi sed iste ab iusto eaque delectus totam minima earum fuga doloribus itaque temporibus, eos atque ducimus laudantium, nisi dicta quibusdam.'
        }, {
            type: 'extjs',
            title: 'A grid with 1000 records',
            'sub_title': 'ext js 3.0',
            link: "extjssimplegrid",
            link_name: 'See Sample',
            link_similar: 'looks',
            link_similar_name: 'More like this',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla sequi sed iste ab iusto eaque delectus totam minima earum fuga doloribus itaque temporibus, eos atque ducimus laudantium, nisi dicta quibusdam.'
        }
        ,
         {
            type: 'html',
            title: 'A html components',
            'sub_title': 'html,css',
            link: "html({type:'html'})",
            link_name: 'See Sample',
            link_similar: 'looks',
            link_similar_name: 'More like this',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla sequi sed iste ab iusto eaque delectus totam minima earum fuga doloribus itaque temporibus, eos atque ducimus laudantium, nisi dicta quibusdam.'
        },
         {
            type: 'html',
            title: 'A Menu',
            'sub_title': 'html, css',
            link: "html({type:'menu-plugin'})",
            link_name: 'See Sample',
            link_similar: 'looks',
            link_similar_name: 'More like this',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla sequi sed iste ab iusto eaque delectus totam minima earum fuga doloribus itaque temporibus, eos atque ducimus laudantium, nisi dicta quibusdam.'
        },{
            type: 'other',
            title: 'A JS library',
            'sub_title': 'javascript, css',
            link: "html({type:'menu-plugin'})",
            link_name: 'See Sample',
            link_similar: 'looks',
            link_similar_name: 'More like this',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla sequi sed iste ab iusto eaque delectus totam minima earum fuga doloribus itaque temporibus, eos atque ducimus laudantium, nisi dicta quibusdam.'
        }]
    });