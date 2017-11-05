// Define the `phonecatApp` module
// var phonecatApp = angular.module('DemoApp', []); // WOULD OVERWRITE THE app.modules.js

// Define the `PhoneListController` controller on the `phonecatApp` module
angular.module('DemoApp').controller('PhoneListController', function PhoneListController($scope) {
  // scope is a prototypal descendant of the root scope (ng-app)
        //available to all bindings located within the controller tag
  $scope.phones = [
    {
      name: 'Nexus S',
      snippet: 'Fast just got faster with Nexus S.'
    }, {
      name: 'Motorola XOOM™ with Wi-Fi',
      snippet: 'The Next, Next Generation tablet.'
    }, {
      name: 'MOTOROLA XOOM™',
      snippet: 'The Next, Next Generation tablet.'
    }
  ];
});