angular.
  module('phoneDetail').
  component('phoneDetail', {
          // do not forget directory !
          templateUrl : 'phone-detail/phone-detail.template.html',
    // template: 'TBD: Detail view for <span>{{$ctrl.phoneId}}</span>',
    controller: ['$scope','$routeParams','$timeout', '$http',
      function PhoneDetailController($scope,$routeParams, $timeout, $http) {
        this.phoneId = $routeParams.phoneId;
        $scope.myState = true;

        var self = this;

        $scope.baseUrl = 'https://raw.githubusercontent.com/angular/angular-phonecat/1.4-snapshot/app/';

        $http.get($scope.baseUrl+'phones/' + $routeParams.phoneId + '.json').then(function(response) {
          self.phone = response.data;
        });
        // no modal
        // $timeout(function(){
        //     $dialog.dialog({}).open('phone-detail/phone-detail.template.html');
        //   }, 500);
      }
    ]
  });