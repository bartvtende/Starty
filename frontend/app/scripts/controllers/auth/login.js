'use strict';

/**
 * @ngdoc function
 * @name startyApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the startyApp
 */
angular.module('startyApp')
  .controller('LoginCtrl', function ($scope, $auth, $mdToast) {

    $scope.login = function(user) {
      $auth.login({
        email: user.email,
        password: user.password
      }).then(function(response) {
        if (!('error' in response.data)) {
          $mdToast.show(
              $mdToast.simple()
                  .content('You are now logged in!')
                  .position('bottom left')
                  .hideDelay(3000)
          );
        }
      })
    };

  });
