// Karma configuration
// Generated on Mon Sep 29 2014 14:30:03 GMT+0530 (India Standard Time)

module.exports = function(config) {
    config.set({

        preprocessors: {
            'app/views/templates/**/*.html': ['ng-html2js'],
            'app/**/*.js': ['coverage']

        },

        ngHtml2JsPreprocessor: {
            // setting this option will create only a single module that contains templates
            // from all the files, so you can load them all with module('foo')
            moduleName: 'templates',
            cacheIdFromPath: function(filepath) {
                return filepath.substr(filepath.indexOf('/'));
            },

        },
        // base path, that will be used to resolve files and exclude
        basePath: '',


        // frameworks to use
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            'app/bower_components/jquery/jquery.js',
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/bower_components/angular-resource/angular-resource.js',
            'app/bower_components/angular-cookies/angular-cookies.js',
            'app/bower_components/angular-sanitize/angular-sanitize.js',
            'app/bower_components/angular-ui-router/release/angular-ui-router.js',
            'app/bower_components/angular-translate/angular-translate.js',
            'test/mock/**/*.js',
            'app/scripts/plugins/*.js',
            'app/scripts/plugins/**/*.js',
            'app/scripts/libraries/*.js',
            'app/scripts/libraries/**/*.js',
            // 'app/scripts/global/i18/*.js',
            'app/scripts/*.js',
            'app/scripts/global/*.js',
            // 'app/scripts/filters/*.js',
            'app/scripts/services/*.js',
            'app/scripts/services/**/*.js',
            'app/scripts/controllers/*.js',
            'app/scripts/controllers/**/*.js',
            'app/scripts/directives/*.js',
            'app/scripts/directives/**/*.js',
            'test/spec/**/*.js',
            'app/views/templates/**/*.html'
        ],


        // list of files to exclude
        exclude: [

        ],


        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['progress', 'coverage'],
       


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera (has to be installed with `npm install karma-opera-launcher`)
        // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
        // - PhantomJS
        // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
        browsers: ['PhantomJS' /*'Chrome' , 'Firefox', 'Safari', 'IE', 'PhantomJS'*/ ],


        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,


        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false
    });
};