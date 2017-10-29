// config - SPA
// controller entered twice as two views ? ...
angular.module('DemoApp').config(function ($routeProvider) {
    $routeProvider
        .when('/',
            {
                controller: 'SimpleController',
                templateUrl: 'partials/View1.html'
            })
        .when('/view2',
            {
                controller: 'SimpleController',
                templateUrl: 'partials/View2.html'
            })
        .otherwise({redirectTo:'/'});
});