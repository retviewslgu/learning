// https://weblogs.asp.net/dwahlin/video-tutorial-angularjs-fundamentals-in-60-ish-minutes
//  https://weblogs.asp.net/dwahlin/angularjs-in-60-ish-minutes-the-ebook
// https://www.w3schools.com/angular/angular_application.asp
// https://weblogs.asp.net/dwahlin/learning-angularjs-by-example-the-customer-manager-application
    // https://github.com/DanWahlin/CustomerManagerStandard

// NEXT : https://github.com/jrief/django-angular
// http://glynjackson.org/weblog/tutorial-using-angularjs-django/
// http://django-angular.readthedocs.io/en/latest/s
/**
 *   * CONTROLLER =
 *
 *   Container isolated from viewS (isolation, loosely coupled, modular , MVC)
 *   - interact, 'glue' (viewmodel=data model for the view) with the view through the $scope [M]
 *      depedency being injected auto-magically
 *      bound into the view once the view knows its controller
 *   - drive which data gets bound into the view [V]
 *   - contains logic separated from view [C]
 *   - interact with other services (database, http, etc.)
 *
 *   With Angular 1.3+ you can no longer use global controller declaration on the global scope
 *   register the controller using module.controller
 *      https://stackoverflow.com/questions/25111831/controller-not-a-function-got-undefined-while-defining-controllers-globally
 *
 *   Also : user angular-route as a new dependency
 *   https://stackoverflow.com/questions/19197182/error-injectorunpr-unknown-provider-routeprovider
 *
 *   *  MODULE =
 *   - modularity
 *   - has :
 *      - config has
 *          - routes = link not harcoded, and flexible between (view,controller)
 *              - view + directives + filters
 *              - controller + factories = CRUD and data services
 *              - no need for ng-controller then
 *              - helps define SPA , with sub-views
 *       - controller can be injected into scope
 *   - here ,  other modules could injected with ['ngRoute'], like ['helperModule']
 *
 */
var root = 'https://jsonplaceholder.typicode.com';
var demoApp = angular.module('DemoApp', ['ngRoute'])
// function could be anonymous  : controller('SimpleController', function($scope){})
    //  controller can take list of controller {}
    .controller('SimpleController', ['$scope', 'simpleFactory', function SimpleController($scope, simpleFactory) {
    // DO NOT FORGET twice dependencies ['simpleFactory',function (simpleFactory) + ORDER OF THEM ...

        console.log('Entering controller');
        // fake data from db
        $scope.members=[
                {name:'Ludo', city:'Wol'},
                {name:'Loic', city:'Ucl'},
                {name:'Lorenzo', city:'Ixl'}
            ];

        $scope.addMember=function(){
            $scope.members.push({
                name:$scope.newMember.name,
                city:$scope.newMember.city
            });
        }

        // simpleFactory auto injected
        // update scope for the view
        simpleFactory.getPosts().then(function (result) {
            // Async handling
            $scope.posts = result.data;
            console.log("Remote posts loaded "+$scope.posts.length)
        })


 }]);

// config - SPA
// controller entered twice as two views ? ...
demoApp.config(function ($routeProvider) {
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

// https://toddmotto.com/factory-versus-service
// https://blog.thoughtram.io/angular/2015/07/07/service-vs-factory-once-and-for-all.html
// http://www.learn-angular.org/#!/lessons/the-factory-recipe (service)
// https://www.airpair.com/javascript/posts/services-in-angularjs-simplified-with-examples
demoApp.factory('simpleFactory', ['$http',function ($http) {
    // DO NOT FORGET twice dependencies ['$http',function ($http) ...
    var factory = {};

    factory.getPosts = function(){
        // https://www.w3schools.com/angular/angular_http.asp
            var posts = $http.get(root + '/posts/');

            console.log(root + '/posts/');
            // https://www.w3schools.com/jsref/jsref_length_array.asp
            // https://stackoverflow.com/questions/28175381/how-to-access-json-array-object-in-html-using-angular
            console.log("Remote posts loaded "+posts.length)
            //  return $http.get(urlBase+'/GetStudents');
            return posts;
    }
    return factory;
}]);

/*
Service like snippet :
var StudentService = angular.module('StudentService', [])
StudentService.factory(...)
demoApp.module(demoApp,['StudentService']
 */