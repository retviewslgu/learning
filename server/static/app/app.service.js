angular.module('PolarApp')
    .service("PolarService", function ($http, $q) {
            console.log('PolarService init')

            var self = this
            var baseUrl = 'http://localhost:8080/'

            var apiGet = function (apiEndpoint) {
                    return function () {
                            console.log('apiGet '+apiEndpoint)
                            var deferred = $q.defer();
                            return $http.get(baseUrl+apiEndpoint)
                                .then(function (response) {
                                        console.log('apiGet '+apiEndpoint+' OK')
                                        console.log('apiGet '+apiEndpoint+' payload ='+JSON.stringify(response))
                                        deferred.resolve(response.data);
                                        return deferred.promise;
                                }, function (response) {
                                        console.log('apiGet '+apiEndpoint+' KO')
                                        deferred.reject(response);
                                        return deferred.promise;
                                });
                    }
            }

            var apiPost = function (apiEndpoint) {
                    return function (requestObj) {
                            console.log('apiPost '+apiEndpoint)
                            var deferred = $q.defer();
                            var jsonRequest = JSON.stringify(requestObj)
                            console.log('apiPost '+apiEndpoint+' request = '+jsonRequest)
                            var config = {headers: {'Content-Type': 'application/json'}}
                            return $http.post(baseUrl+apiEndpoint, jsonRequest, config)
                                .then(function (response) {
                                        console.log('apiPost '+apiEndpoint+' OK')
                                        console.log('apiPost '+apiEndpoint+' payload ='+JSON.stringify(response))
                                        deferred.resolve(response.data);
                                        return deferred.promise;
                                }, function (response) {
                                        console.log('apiPost '+apiEndpoint+' KO')
                                        deferred.reject(response);
                                        return deferred.promise;
                                });
                    }
            }

            /* Login */
            self.isAdmin = false
            self.getUsers = apiGet('users')
            self.adminMakePoll = apiPost('make_poll')
            self.login = apiPost('login')
            self.findLastOpenUnarchivedPoll = apiGet('last_poll/0/0')
            self.findLastUnsubmittedVote = apiGet('last_vote')

            /* Vote */
            self.closeVote = apiPost('close_vote')

            /* Result */
            self.closePoll = apiPost('close_poll')
            self.archivePoll = apiPost('archive_poll')
    });