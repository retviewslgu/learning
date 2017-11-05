angular.
  module('phoneDetail').
  component('phoneDetail', {
          // do not forget directory !
          templateUrl : 'phone-detail/phone-detail.template.html',
    // template: 'TBD: Detail view for <span>{{$ctrl.phoneId}}</span>',
    controller: ['$scope','$routeParams','$timeout', '$http', 'PhoneDetailService',
      function PhoneDetailController($scope,$routeParams, $timeout, $http, PhoneDetailService) {
        var self = this; // = $ctrl >< $scope

        /* Isolated scope variables */
        self.phoneId = $routeParams.phoneId;
        $scope.baseUrl = 'https://raw.githubusercontent.com/angular/angular-phonecat/1.4-snapshot/app/';
        self.myBaseUrl = $scope.baseUrl;
        $scope.showModalState = true;
        $scope.modalTitle = this.phoneId.replace(/-/g,' ').toUpperCase();

        /* functions */
        self.setImage = function setImage(imageUrl) {
          self.mainImageUrl = self.myBaseUrl+imageUrl;
        };


        /**
         * API
         */
        // $http.get($scope.baseUrl+'phones/' + $routeParams.phoneId + '.json').then(function(response) {
        //   self.phone = response.data;
        //   self.setImage(self.myBaseUrl+self.phone.images[0])
        // });
        self.dataLoading = true;
        PhoneDetailService.getPhoneDetail(self.phoneId).then(
            function successClb (response) {
              self.phone = response.phoneData;
              self.setImage(self.myBaseUrl+self.phone.images[0])
              self.dataLoading = false;
            },
            function errorClb(error) {
              self.dataLoading = false;
            }
            );


        // no modal
        // $timeout(function(){
        //     $dialog.dialog({}).open('phone-detail/phone-detail.template.html');
        //   }, 500);
      }
    ]
  });