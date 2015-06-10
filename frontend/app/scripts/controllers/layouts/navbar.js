'use strict';

/**
 * @ngdoc function
 * @name startyApp.controller:NavbarctrlCtrl
 * @description
 * # NavbarctrlCtrl
 * Controller of the startyApp
 */
angular.module('startyApp')
  .controller('NavbarCtrl', function ($scope, $mdSidenav, $mdDialog, $state, $stateParams, OrganizationData) {

    $scope.projectName = $stateParams.projectName;
    $scope.organizationName = '';

    $scope.$watch('$viewContentLoaded', function() {
      if ($stateParams.projectName != null) {
        console.log('projects');
      } else {
        OrganizationData.getOrganization()
          .success(function (organization) {
            $scope.organizationName = organization.result.name;
          })
          .error(function (err) {
            console.log('Something went wrong while fetching the organization info!');
          });
      }
    });

    $scope.toggleSidenav = function(menuId) {
      $mdSidenav(menuId).toggle();
    };

    $scope.navigateTo = function(to) {
      $state.go(to);
    };

    $scope.spawnSearchPopup = function(event) {
      $mdDialog.show({
        controller: 'SearchCtrl',
        templateUrl: 'views/components/search.html',
        targetEvent: event
      })
      .then(function(answer) {
        $scope.alert = 'You said the information was "' + answer + '".';
      }, function() {
        $scope.alert = 'You cancelled the dialog.';
      });
    };

    $scope.spawnProfilePopup = function(event) {
      $mdDialog.show({
        controller: 'ProfileCtrl',
        templateUrl: 'views/components/profile.html',
        targetEvent: event
      })
      .then(function(answer) {
        $scope.alert = 'You said the information was "' + answer + '".';
      }, function() {
        $scope.alert = 'You cancelled the dialog.';
      });
    };
  });
