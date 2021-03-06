(function() {
    'use strict';

    angular
        .module('adapGatewayApp', [
            'ngFileSaver',
        	'ngStorage', 
            'tmh.dynamicLocale',
            'pascalprecht.translate', 
            'ngResource',
            'ngCookies',
            'ngAria',
            'ngMaterial',
            'ngCacheBuster',
            'ngFileUpload',
            'ui.bootstrap',
            'ui.bootstrap.datetimepicker',
            'ui.router',
            'infinite-scroll',
            'ngSanitize',
            'ui.filters',
            'datatables',
          
            // jhipster-needle-angularjs-add-module JHipster will add new module here
            'angular-loading-bar',
            // Add INSPINIA modules here
            'oc.lazyLoad',
            'ngIdle',
            //'ngFileSaver',
        ])
        .run(run);

    run.$inject = ['stateHandler', 'translationHandler'];

    function run(stateHandler, translationHandler) {
        stateHandler.initialize();
        translationHandler.initialize();
    }
    
    
})();
