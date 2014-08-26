'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'CornerCouch'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/logs', {templateUrl: 'partials/logs.html', controller: 'LogListCtrl'});
  $routeProvider.when('/log/:appId', {templateUrl: 'partials/viewLog.html', controller: 'LogViewCtrl'});
  $routeProvider.otherwise({redirectTo: '/logs'});
}])
.run(function($rootScope, cornercouch) {
    $rootScope.server = cornercouch();
    $rootScope.server.session();
    $rootScope.logdb = $rootScope.server.getDB('logs');
    console.log($rootScope.logdb);
});
