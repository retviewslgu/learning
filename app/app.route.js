// config - SPA
// controller entered twice as two views ? ...
angular.module('DemoApp').config(['$locationProvider', '$routeProvider',
        function ($locationProvider,$routeProvider) {
                // implicit default if not stated here
                //  This prefix will appear in the links - good practice
                $locationProvider.hashPrefix('!');

                // ROUTES
                $routeProvider
                        .when('/',
                            {
                                controller: 'SimpleController',
                                templateUrl: 'partials/View1.html'
                            })
                        .when('/view1',
                            {
                                controller: 'SimpleController',
                                templateUrl: 'partials/View1.html'
                            })
                        .when('/view2',
                            {
                                controller: 'SimpleController',
                                templateUrl: 'partials/View2.html'
                            })
                        .when('/git',{
                                controller: 'promiseController',
                                templateUrl: 'partials/GitView.html'
                            }
                        )
                        .when('/phone_detail/:phoneId',
                            {
                              template: '<phone-detail></phone-detail>' // direct component
                            }
                        )
                        .otherwise({redirectTo:'/'});
                // => domain_name/#!/ ??
                // redirect needed ?
                // otherwise('page')
}]);