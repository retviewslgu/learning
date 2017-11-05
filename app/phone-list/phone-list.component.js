// Register `phoneList` component, along with its associated controller and template
// component +- = light directive
// isolated model in this new tag
angular.module('phoneListModule').component('componentPhoneList', {
        // Note: The URL is relative to our `index.html` file
        templateUrl: 'phone-list/phone-list.template.html',
        // $scope not defined : add it here in the ctrller dependcies
        // inline injection with names to be sure minify will work correctly !
        controller: ['$scope', '$http', 'PhonesService', function ComponentPhoneListController($scope, $http, PhonesService) {
                var self = this;
                self.orderProp = 'age'; // initial


                $scope.baseUrl = PhonesService.baseUrl;
                // https://docs.angularjs.org/api/ng/service/$http
                // $http.get('').then(successCallback(response), errorCallback(error), progressCallback(progress));
                // response {
                //         data, status, headers, config
                // }
                //      (shortcut version + httpPromise handling)
                //      VS
                // $http ({url, data, method, header, timeout}).success(function(data, status, headers, config){})
                //      (full version with direct callbacks)
                //      VS
                // $http.get('').success(function(data, status, headers, config){}) : return httpPromise = a promise !
                // promise.then(payload)
                // then triggered only after it is done

                // V1
                //     PhonesService.getHttpPhones().then(
                //   function successCallback(answer) {
                //     self.phones = answer.data;
                //   },
                //   function errorCallback(msg) {
                //     alert(msg);
                // });

                // V2
                PhonesService.getPhones().then(
                    function successCallback(answer) {
                            self.phones = answer.phoneList; // not 'answer' alone
                    },
                    function errorCallback(msg) {
                            alert(msg);
                    });


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

        }]
});