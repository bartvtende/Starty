'use strict';

/**
 * @ngdoc function
 * @name startyApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the startyApp
 */
angular.module('startyApp')
  .controller('RegisterCtrl', function ($scope) {

      $scope.register = function(user) {
        console.log(user);

        return false;
      };

  });
