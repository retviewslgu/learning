angular.module('PolarApp')
    .service("PolarService", function ($http, $q) {

    var deferred = $q.defer();

    this.getUsers = function () {
        return $http.get('http://localhost:8080/users')
            .then(function (response) {
                // promise is fulfilled
                deferred.resolve(response.data);
                console.log(JSON.stringify(response))
                // promise is returned
                return deferred.promise;
            }, function (response) {
                // the following line rejects the promise
                deferred.reject(response);
                // promise is returned
                return deferred.promise;
            })
        ;
    };
});