'use strict';

/**
 * @ngdoc function
 * @name mockupsApp.controller:IssuesCtrl
 * @description
 * # IssuesCtrl
 * Controller of the mockupsApp
 */
angular.module('mockupsApp')
  .controller('IssuesCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
