// config - SPA
// Could be named 'app.config.js'
// controller entered twice as two views ? ...
angular.module('DemoApp').config(['$locationProvider', '$routeProvider',
        function ($locationProvider,$routeProvider) {
                // Providers are objects that provide (create) instances of services and expose configuration APIs
                // They can only be injected into config functions

                // implicit default if not stated here
                //  This prefix will appear in the links - good practice
                $locationProvider.hashPrefix('!');

                // ROUTES
                //  Allows deep linking, which lets us utilize the browser's history + bookmark
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
                        // Can associate component too !
                        // + variable part of the URL, extracted through the $routeParams service
                        .when('/phone_detail/:phoneId',
                            {
                              template: '<phone-detail></phone-detail>' // direct component
                            }
                        )
                        .when('/proto',
                            {
                                controller: 'ProtoInheritanceCtrl',
                                templateUrl: 'proto-inheritance/ProtoInheritance.html'
                            }
                        )
                        .otherwise({redirectTo:'/'});
                // => domain_name/#!/ ??
                // redirect needed ?
                // otherwise('page')
}]);