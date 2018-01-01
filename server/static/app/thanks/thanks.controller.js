angular.module('PolarApp')
    .controller('ThanksController', ['$scope', 'PolarService','$location', '$interval',
            function ThanksController($scope, PolarService, $location, $interval) {
                    console.log('Entering ThanksController');
                    $scope.lastPoll = PolarService.lastPoll
                    $scope.closePoll = PolarService.closePoll.then(function success() {
                        $location.path( "/results" );
                    })
            }]);