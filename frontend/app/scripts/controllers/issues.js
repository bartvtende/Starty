'use strict';

/**
 * @ngdoc function
 * @name startyApp.controller:IssuesCtrl
 * @description
 * # IssuesCtrl
 * Controller of the startyApp
 */
angular.module('startyApp')
  .controller('IssuesCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
