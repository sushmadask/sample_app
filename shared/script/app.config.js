// App module
var app = angular.module('sample-poc',['ui.router','isteven-multi-select','textAngular','ngSanitize','ngTagsInput','ui.bootstrap']);


app.global = {
    CMP_TPL_BASE_URL: 'components/'
};

app.url = {
};

app.state={
    NEXT:'listing'
};

app.popUpType = {
    ALERT: 'alert',
    INFO: 'info',
    CONFIRM: 'confirm',
    ERROR: 'error',
    LOADING: 'loading',
    VALIDATE: 'validate',
    UPDATE:'update',
    SUMMARY:'summary'
};

app.popUpSize={
    SMALL:'sm',
    MEDIUM:'md',
    LARGE:'lg'
};

app.storage={
};

// app starter
(function () {
    app.run(function ($rootScope, $http, $state) {
        $rootScope.$on('AppRootData', function (event, data) {
            $rootScope.userId = data.id;
        });

        // loading indicator
        $rootScope.$on('loading:show', function () {

        });
        $rootScope.$on('loading:hide', function () {

        });

        $rootScope.$on('$stateChangeStart', function (e, toState, toParams, fromState, fromParams) {
        });
    });

    app.config(function ($provide, $httpProvider, $stateProvider, $urlRouterProvider, $locationProvider) {

        // centralized ajax exception handler with loading indicator
        $provide.factory('HttpInterceptor', function ($rootScope, $q) {
            return {
                'request': function (config) {
                     $('.ajaxOverlay').show();
                    if (typeof config.timeout  !== undefined){
                        config.timeout =1200000000;
                    }
                    return config;
                },
                'requestError': function (rejection) {
                    $('.ajaxOverlay').hide();
                    return $q.reject(rejection);
                },
                'response': function (response) {
                   // 

                    // checking API response
                    var resStatus = response.data.response;
                    if (resStatus === undefined || resStatus.error === 0) { // handling 'undefined' condition for page load(not http)                        
                       // $('.ajaxOverlay').hide();
                        return response;
                    } else {
                      //  $('.ajaxOverlay').hide();
                        return $q.reject(response);
                    }
                },
                'responseError': function (rejection) {
                    // alert(JSON.stringify(rejection));
                    $('.ajaxOverlay').hide();
                    return $q.reject(rejection);
                }
            };
        });
        $httpProvider.interceptors.push('HttpInterceptor');


        $urlRouterProvider.otherwise('/landing');


        $stateProvider
            .state('landing', {
                url: '/landing',
                views: {
                    'contentView': {
                        templateUrl: app.global.CMP_TPL_BASE_URL + 'landing/landing.html',
                        controller: 'LandingController'
                    }
                }
            })
            .state('listing', {
                url: '/listing',
                views: {
                    'contentView': {
                        templateUrl: app.global.CMP_TPL_BASE_URL + 'listing/listing.html',
                        controller: 'ListingController'
                    }
                }
            });
        // $locationProvider.html5Mode(true);
    });
})();