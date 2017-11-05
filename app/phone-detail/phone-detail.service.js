angular.module('phoneDetail')
        .service('PhoneDetailService', ['$http', '$q',function ($http, $q) {
                var self = this; // the singleton ref
                self.baseUrl = 'https://raw.githubusercontent.com/angular/angular-phonecat/1.4-snapshot/app/';


                /**
                 * Promise nesting !
                 * Caller must just handle the post-processed flow !
                 */
                self.getPhoneDetail = function (phoneId) {
                     var deferred = $q.defer();

                     $http.get(self.baseUrl+'phones/' + phoneId + '.json').then(
                             function successClb(response){
                                 deferred.resolve(
                                             // custom data passing
                                             {
                                                     phoneData : response.data
                                             }
                                     );
                                }
                             ,
                             function errorClb(error){
                                        deferred.reject(error.msg);
                                        $log.error(error.msg, error.code); // internal service stuff
                                }
                         );

                     return deferred.promise;
                }
        }])