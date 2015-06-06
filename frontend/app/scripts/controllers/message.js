'use strict';

/**
 * @ngdoc function
 * @name mockupsApp.controller:MessageCtrl
 * @description
 * # MessageCtrl
 * Controller of the mockupsApp
 */
angular.module('mockupsApp')
  .controller('MessageCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
