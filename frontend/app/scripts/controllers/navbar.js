'use strict';

/**
 * @ngdoc function
 * @name startyApp.controller:NavbarctrlCtrl
 * @description
 * # NavbarctrlCtrl
 * Controller of the startyApp
 */
angular.module('startyApp')
  .controller('NavbarCtrl', function ($scope, $mdSidenav, $mdDialog, $state) {
    $scope.toggleSidenav = function(menuId) {
      $mdSidenav(menuId).toggle();
    };

    $scope.navigateTo = function(to) {
      $state.go(to);
    };

    $scope.spawnSearchPopup = function(event) {
      $mdDialog.show({
        controller: 'SearchCtrl',
        templateUrl: 'views/search.html',
        targetEvent: event
      })
      .then(function(answer) {
        $scope.alert = 'You said the information was "' + answer + '".';
      }, function() {
        $scope.alert = 'You cancelled the dialog.';
      });
    };

    $scope.spawnProfilePopup = function(event) {
      $mdDialog.show(
        $mdDialog.alert()
          .title('Profile')
          .content('Change profile details')
          .ariaLabel('Profile')
          .ok('Close menu')
          .targetEvent(event)
      );
    };
  });
