'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('PageListCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
      $rootScope.wikidb.query("sliki", "pages", { include_docs: true });
  }])
  .controller('PageViewCtrl', ['$scope', '$rootScope', '$routeParams', function($scope, $rootScope, $routeParams) {
    console.log($routeParams);
    var doc_object = $rootScope.wikidb.newDoc();
    doc_object.load($routeParams.pageId)
      .success(function () {$scope.page = doc_object});
    console.log(doc_object);
  }])
  .controller('PageEditCtrl', ['$scope', '$rootScope', '$routeParams', '$location', function($scope, $rootScope, $routeParams, $location) {
    if ('pageId' in $routeParams) {
      var doc_object = $rootScope.wikidb.newDoc();
      doc_object.load($routeParams.pageId)
        .success(function () {$scope.editingPage = doc_object});
    } else {
      $scope.editingPage = $scope.wikidb.newDoc();
    }
    
    console.log($scope.previousPage);
    
    $scope.submitPage = function() {
      console.log($scope.editingPage);
      console.log($scope.previousPage);
      console.log($scope.previousPage == $scope.editingPage);
      $scope.editingPage.save()
      .success( function() {
        $location.path('/p/' + $scope.editingPage._id);
      });
    };
    
    $scope.attachClick = function() {
      var fileInput = document.getElementById("upload");
      console.log(fileInput);
      $scope.editingPage.attachMulti(fileInput.files, function () {
          fileInput.value = "";
      });
    };
    
    $scope.removeClick = function() {
      $scope.editingPage.remove()
      .success(function() {
        $location.path('/pages');
      });
    }
  }]);
