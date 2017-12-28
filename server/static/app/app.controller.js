angular.module('PolarApp')
    .controller('SimpleController', ['$scope', 'PolarService',
            function SimpleController($scope, PolarService) {
                console.log('Entering controller');

                PolarService.getUsers().then(
                    function (result) {
                            // Async handling
                            $scope.users = result;
                            console.log("Users loaded "+$scope.users.length)
                                        },
                function(error) {
                        // handle errors here
                        console.log(error.statusText);
                 }
                )

 }]);