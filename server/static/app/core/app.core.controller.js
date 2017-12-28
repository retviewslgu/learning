angular.module('app.core')
        .controller("promiseController", function($scope, $q, $timeout, githubService) {
  $scope.showGitLoading = true; // this.XXX doesn't work
  githubService.getAccount()
    .then(
      function(result) {
        // promise was fullfilled (regardless of outcome)
        // checks for information will be peformed here
        $scope.account = result;

        // fake a network latency
        // https://stackoverflow.com/questions/35548207/how-to-apply-delay-on-angularjs
        $timeout(function() {
                $scope.showGitLoading = false;},
            500);
      },
      function(error) {
        // handle errors here
        console.log(error.statusText);
        $scope.showGitLoading = false;
      }
    );
});