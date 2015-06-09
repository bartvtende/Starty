'use strict';

/**
 * @ngdoc function
 * @name startyApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the startyApp
 */
angular.module('startyApp')
  .controller('RegisterCtrl', function ($scope, $auth, $mdToast) {

      $scope.register = function(user) {
          $auth.signup({
              name: user.name,
              email: user.email,
              password: user.password
          }).then(function (response) {
              if (!('error' in response.data)) {
                  $mdToast.show(
                      $mdToast.simple()
                          .content('You are now signed up and logged in!')
                          .position('bottom left')
                          .hideDelay(3000)
                  );
              }
          });
      };

  });
