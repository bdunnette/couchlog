'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('LogListCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
    $rootScope.logdb.query("logs", "hosts", { include_docs: false, group: true });
    console.log($rootScope.logdb);
  }])
  .controller('LogViewCtrl', ['$scope', '$rootScope', '$routeParams', function($scope, $rootScope, $routeParams) {
    $scope.host = $routeParams.host;
    $scope.appName = $routeParams.appName;
    var queryKey = [];
    queryKey.push($routeParams.host);
    queryKey.push($routeParams.appName);
    $rootScope.logdb.query("logs", "logEntries", { reduce:false, key: queryKey});
  }]);
