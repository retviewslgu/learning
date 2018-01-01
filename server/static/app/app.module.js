// https://www.w3schools.com/js/js_strict.asp
"use strict";
// define the main module
angular.module('PolarApp', [
        'ui.bootstrap',
        'ngMaterial', // break some demoapp.css,
        'ngRoute'
])

angular.module('PolarApp')
    .directive('loading',   ['$http' ,function ($http)
    {
        return {
            restrict: 'A',
            link: function (scope, elm, attrs)
            {
                scope.isLoading = function () {
                    return $http.pendingRequests.length > 0;
                };

                scope.$watch(scope.isLoading, function (v)
                {
                    if(v){
                        elm.show();
                    }else{
                        elm.hide();
                    }
                });
            }
        };

    }]);