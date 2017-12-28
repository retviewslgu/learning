angular.module('app.core')
    .service("githubService", function ($http, $q) {

    var deferred = $q.defer();

    this.getAccount = function () {
        return $http.get('https://api.github.com/users/haroldrv')
            .then(function (response) {
                // promise is fulfilled
                deferred.resolve(response.data);
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