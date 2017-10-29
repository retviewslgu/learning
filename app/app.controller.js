
// TODO NO NEED for the dependencies here , as defined in the module.js ? seems ok ...
var demoApp = angular.module('DemoApp')
// function could be anonymous  : controller('SimpleController', function($scope){})
    //  controller can take list of controller {}
    .controller('SimpleController', ['$scope', 'simpleFactory', function SimpleController($scope, simpleFactory) {
    // DO NOT FORGET twice dependencies ['simpleFactory',function (simpleFactory) + ORDER OF THEM ...

        console.log('Entering controller');
        // fake data from db
        $scope.members=[
                {name:'Ludo', city:'Wol'},
                {name:'Loic', city:'Ucl'},
                {name:'Lorenzo', city:'Ixl'}
            ];

        $scope.addMember=function(){
            $scope.members.push({
                name:$scope.newMember.name,
                city:$scope.newMember.city
            });
        }

        // simpleFactory auto injected
        // update scope for the view
        simpleFactory.getPosts().then(function (result) {
            // Async handling
            $scope.posts = result.data;
            console.log("Remote posts loaded "+$scope.posts.length)
        })


 }]);