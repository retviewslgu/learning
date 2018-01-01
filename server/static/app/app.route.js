angular.module('PolarApp')
    .config(['$locationProvider', '$routeProvider',
        function ($locationProvider,$routeProvider) {
                //  This prefix will appear in the links - good practice
                $locationProvider.hashPrefix('!');

                // ROUTES
                $routeProvider
                        .when('/',
                            {
                                controller: 'LoginController',
                                templateUrl: 'views/login.html'
                            })
                        .when('/thanks',
                            {
                                templateUrl: 'views/thanks.html'
                            })
                        .when('/vote',
                            {
                                templateUrl: 'views/vote_form.html'
                            })

                        .when('/results',
                            {
                                templateUrl: 'views/topflop_results.html'
                            })
                        .otherwise({redirectTo:'/'});
}]);