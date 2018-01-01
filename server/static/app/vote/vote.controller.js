angular.module('PolarApp')
    .controller('VoteController', ['$scope', 'PolarService','$location',
            function VoteController($scope, PolarService, $location) {
                    console.log('Entering VoteController');
                    $scope.lastVote = PolarService.lastVote // ?
                    $scope.closeVote = PolarService.closeVote.then(function success() {
                        $location.path( "/thanks" );
                    })
            }]);