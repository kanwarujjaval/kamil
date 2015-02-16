/**
 * Created by KanwarUjjaval on 16-02-2015.
 */
app = angular.module('app',[]);
app.factory('api', function ($q, $http,$rootScope) {
    return {
        post: function (data, path) {
            var deferred = $q.defer();
            $http.post(path, data)
                .success(function (data, status, header) {
                    deferred.resolve(data);
                    $rootScope.$$phase || $rootScope.$apply();
                })
                .error(function (data, status, header) {
                    deferred.reject(status);
                });
            return deferred.promise;
        },
        get: function (path) {
            var deferred = $q.defer();
            $http.get(path)
                .success(function (data, status, header) {
                    deferred.resolve(data);
                })
                .error(function (data, status, header) {
                    deferred.reject(status);
                });
            return deferred.promise;
        }
    }
});

app.controller('dash', function ($scope,api) {
    var a = function() {
        api.get('/invites')
            .then(
            function (response) {
                $scope.invites = response;
            }
        );
    };
    a();

    var b = function() {
        api.get('/subscribes')
            .then(
            function (response) {
                $scope.subscribes = response;
            }
        );
    }
    b();
    $scope.accept=function(invite){
        api.get('/token/create/'+invite._id)
            .then(
            function (response) {
                $scope.invite = response;
                a();
            });
    }

    $scope.deny=function(invite){
        api.get('/token/deny/'+invite._id)
            .then(
            function (response) {
                $scope.invite = response;
                a();
            });
    }
});