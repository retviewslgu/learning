angular.module('PolarApp')
    .controller('ResultController', ['$scope', 'PolarService','$location',
            function ResultController($scope, PolarService, $location) {
                    console.log('Entering ResultController');
                    if(!PolarService.isAdmin){
                            console.log('Non granted access to results')
                            $location.path( "/thanks" );
                    }

                    PolarService.findLastOpenUnarchivedPoll().then(function (response) {
                            PolarService.lastPoll = result['last_poll']
                            $scope.lastPoll = PolarService.lastPoll
                            if($scope.lastPoll != null){
                                    $scope.users.forEach(function (user, index) {
                                            if(user.id == $scope.lastPoll.admin_id){
                                                    $scope.adminName = user.name
                                            }
                                    })
                            }
                    });

                    $scope.archivePoll = PolarService.archivePoll.then(function success() {
                        $location.path( "/" );
                    })
            }]);