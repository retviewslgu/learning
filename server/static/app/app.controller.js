angular.module('PolarApp')
    .controller('LoginController', ['$scope', 'PolarService','$location',
            function LoginController($scope, PolarService, $location) {
                    console.log('Entering LoginController');

                    /* INIT calls of this controller */
                    PolarService.getUsers().then(
                        function (result) {
                                $scope.users = result;
                                console.log("Users loaded "+$scope.users.length)
                        },
                        function(error) {
                                console.log(error.statusText);
                        }
                    )

                    PolarService.findLastOpenUnarchivedPoll().then(function (response) {
                            PolarService.lastPoll = result['last_poll']
                            $scope.lastPoll = PolarService.lastPoll
                            // alert('findLastOpenUnarchivedPoll '+JSON.stringify(response))
                            if($scope.lastPoll != null){
                                    $scope.users.forEach(function (user, index) {
                                        // console.log(user.name+','+user.id+','+$scope.lastPoll.admin_id )
                                            if(user.id == $scope.lastPoll.admin_id){
                                                    $scope.adminName = user.name
                                            }
                                    })
                            }
                    });

                    /* Scoped variables */
                    $scope.isAdmin = PolarService.isAdmin
                    $scope.loginModel = undefined

                    // private - FSM
                    function doLogin(idUser) {
                            PolarService.login({'id_user':idUser}).then(function success(result) {
                                    PolarService.lastPoll = result['last_poll']
                                    PolarService.lastVote = result['last_vote']

                                    if(PolarService.lastPoll!=null){
                                            PolarService.isAdmin = PolarService.lastPoll['id_admin'] == idUser
                                            if(PolarService.lastPoll.closed ==0){
                                                   if(PolarService.lastVote!=null && PolarService.lastVote.has_voted == 0) {
                                                       $location.path( "/vote" );
                                                   } else {
                                                        $location.path( "/thanks" );
                                                   }
                                            } else if(PolarService.lastPoll.archived ==0) {
                                                   if(PolarService.isAdmin) {
                                                       $location.path( "/results" );
                                                   } else {
                                                        $location.path( "/thanks" );
                                                   }
                                            } else {
                                                    console.log('admin required, last poll closed archived')
                                            }
                                    } else {
                                            console.log('admin required, no poll yet created')
                                    }
                            })
                    }

                    $scope.adminMakePoll = function () {
                            alert('idAdmin='+$scope.loginModel.idAdmin)
                            PolarService.adminMakePoll({ 'id_admin' : $scope.loginModel.idAdmin}).then(function success(response) {
                                    doLogin($scope.loginModel.idAdmin)
                            })
                    }

            }]);