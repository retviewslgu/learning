angular.module('phoneListModule')
        // inline minimification protection
        // service = CREATE (new) and return a singleton (single INSTANCE) from the def (ES6 constructor function)
        //             = that will be called implicitely with a single 'new',(once)
        //      so data shared across controllers (no duplicated data)
        //      and methods already usable from injection
        //      THIS.properties must be used
        // ><   factory =
        //      RETURN ('class') a singleton object/function (object-type)/single function (= GET function)
        //      -> can run some code before !
        //      -> can return an 'object type = class' : new AuthService(1)
        //      -> can be used as this - AuthService.login()
        // >< provider (config ($provide)
        .service('PhonesService', ['$http', '$q',function ($http, $q) {
                var self = this; // the singleton ref
                self.baseUrl = 'https://raw.githubusercontent.com/angular/angular-phonecat/1.4-snapshot/app/';

                /**
                 * V1
                 * Caller must handle the get httpPromise
                 * Not post-processed :
                 * .then(successCallback, errorCallback);
                 * @returns {HttpPromise}
                 */
                self.getHttpPhones = function () {
                      // https://docs.angularjs.org/api/ng/service/$http
                        return $http.get(self.baseUrl+'phones/phones.json')
                }

                /**
                 * V2
                 * Promise nesting !
                 * Caller must just handle the post-processed flow !
                 */
                self.getPhones = function () {
                     var deferred = $q.defer();

                     self.getHttpPhones().then(
                             function successClb(response){
                                 deferred.resolve(
                                             // custom data passing
                                             {
                                                     phoneList : response.data
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