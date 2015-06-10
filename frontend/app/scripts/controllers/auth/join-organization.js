'use strict';

/**
 * @ngdoc function
 * @name startyApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the startyApp
 */
angular.module('startyApp')
    .controller('JoinCtrl', function ($scope, $state, $mdToast, JoinOrganizationData) {

        $scope.createOrganization = function(name) {
          JoinOrganizationData.joinOrganization({name: name})
            .success(function(organization) {
              $mdToast.show(
                $mdToast.simple()
                  .content('Your organization has been created!')
                  .position('bottom left')
                  .hideDelay(3000)
              );
              $state.go('overview.overview');
            })
            .error(function() {
              $mdToast.show(
                $mdToast.simple()
                  .content('Something went wrong creating the organization!')
                  .position('bottom left')
                  .hideDelay(3000)
              );
            })
        };

        $scope.accept = function() {
            console.log('The invite has been accepted.');
            $state.go('overview.overview');
            $mdToast.show(
                $mdToast.simple()
                    .content('The project has been added to your projects!')
                    .position('bottom left')
                    .hideDelay(3000)
            );
        };

        $scope.decline = function() {
            console.log('The invite has been declined.');
        };

    });
