// Register `phoneList` component, along with its associated controller and template
// component +- = light directive
angular.
  module('phoneListModule').
  component('componentPhoneList', {
      // Note: The URL is relative to our `index.html` file
    templateUrl:'phone-list/phone-list.template.html',
        // $scope not defined : add it here in the ctrller dependcies
        // inline injection with names to be sure minify will work correctly !
    controller: ['$scope','$http', function ComponentPhoneListController($scope, $http) {
      $scope.baseUrl = 'https://raw.githubusercontent.com/angular/angular-phonecat/1.4-snapshot/app/';
      var self = this;



      // this.phones = [
      //   {
      //     name: 'cNexus S',
      //     snippet: 'Fast just got faster with Nexus S.',
      //     age: 3
      //   }, {
      //     name: 'cMotorola XOOM™ with Wi-Fi',
      //     snippet: 'The Next, Next Generation tablet.',
      //     age: 2
      //   }, {
      //     name: 'cMOTOROLA XOOM™',
      //     snippet: 'The Next, Next Generation tablet.',
      //     age: 1
      //   }
      // ];

        self.orderProp = 'age'; // initial

            // https://docs.angularjs.org/api/ng/service/$http
      $http.get($scope.baseUrl+'phones/phones.json').then(
          function successCallback(response) {
            self.phones = response.data;
          },
          function errorCallback(response) {
        });

    }]
  });