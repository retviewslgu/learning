/*
Local def
http://blogs.infinitesquare.com/posts/web/pourquoi-il-ne-faut-pas-utiliser-ngcloak
 */
angular.module('phoneDetail').directive("deferredCloak", function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            attrs.$set("deferredCloak", undefined);
            element.removeClass("deferred-cloak");
        }
    };
});