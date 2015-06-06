'use strict';

/**
 * @ngdoc function
 * @name mockupsApp.controller:ProjectCtrl
 * @description
 * # ProjectCtrl
 * Controller of the mockupsApp
 */
angular.module('mockupsApp')
  .controller('ProjectCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
